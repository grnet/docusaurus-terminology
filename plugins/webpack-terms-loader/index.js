const parseMD = require("parse-md").default;
const store = require("@b-kamphorst/terminology-store");
const path = require("path");
const remark = require("remark");
const remarkHTML = require("remark-html");

function sanitize(p) {
  const p_unix = p.replace(/^\.\//, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const p_win = p
    .replace(/\//g, "\\")
    .replace(/^\.\\/, "")
    .replace(/[*+?^${}()|[\]\\]/g, "\\$&");
  return process.platform === "win32" ? p_win : p_unix;
}

module.exports = function (source) {
  const pattern = new RegExp(`(${sanitize(this.query.termsDir)}.*?)\.(md|mdx)`);
  const unixResourcePath = this.resourcePath;
  const winResourcePath = this.resourcePath.replace(/\\/, "\\\\");

  const termMatch =
    process.platform === "win32"
      ? winResourcePath.match(pattern)
      : unixResourcePath.match(pattern);

  if (termMatch) {
    const resourcePath = termMatch[1].replace(/\d+-/, "");
    const docsDir = sanitize(this.query.docsDir);
    const resourcePathRelativeToDocsDir = path.relative(docsDir, resourcePath);

    const routeBasePath = sanitize(
      this.query.routeBasePath || this.query.docsDir,
    );

    // Ensure targetPath is posix style (URL style)
    const targetPath = path
      .join(routeBasePath, resourcePathRelativeToDocsDir)
      .replace(/\\/g, "/");

    const data = parseMD(source);
    data.metadata.hoverText = data.metadata.hoverText
      ? remark()
          .use(remarkHTML, { sanitize: true })
          .processSync(data.metadata.hoverText).contents
      : "";

    store.addTerm(targetPath, data);
    this.emitFile(targetPath + ".json", JSON.stringify(data));
  }

  return source;
};
