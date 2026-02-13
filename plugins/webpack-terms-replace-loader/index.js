const parseMD = require("parse-md").default;
const path = require("path");
const pkgUp = require("pkg-up");
const pkg = pkgUp.sync({ cwd: process.cwd() });
const root =
  process.platform === "win32" ? path.win32.dirname(pkg) : path.dirname(pkg);

function sanitize(p) {
  const p_unix = p.replace(/^\.\//, "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const p_win = p
    .replace(/\//g, "\\")
    .replace(/\./, "")
    .replace(/[*+?^${}()|[\]\\]/g, "\\$&");
  return process.platform === "win32" ? p_win : p_unix;
}

module.exports = function (source) {
  const urlsRegex = /(?<!!)\[[^\]]+\]\([^)]+\)/g;
  const urlRegex = /\[\s*(.*?)\s*\]\((.*?)\)/s;
  const urls = source.match(urlsRegex) || [];

  if (urls.length > 0) {
    // Extract front matter (--- ... ---)
    const frontMatterMatch = source.match(/^---\n[\s\S]*?\n---\n/);
    const frontMatter = frontMatterMatch ? frontMatterMatch[0] : "";
    const contentWithoutFrontMatter = frontMatterMatch
      ? source.slice(frontMatterMatch[0].length)
      : source;

    // Prepare the import statement
    const importStatement = `import Term from "${this.query.termPreviewComponentPath || "@b-kamphorst/docusaurus-term-preview"}";\n`;

    // Only add the import if it’s not already in the source
    const contentAlreadyHasImport =
      contentWithoutFrontMatter.includes(importStatement);

    const parsed = require("parse-md").default(contentWithoutFrontMatter);
    source =
      frontMatter +
      (contentAlreadyHasImport ? "" : importStatement) +
      parsed.content;

    for (const url of urls) {
      const [mdUrl, title, urlPath] = url.match(urlRegex);
      const newLineRegex = /\n/g;
      const newLineCount = (title.match(newLineRegex) || []).length;
      if (newLineCount <= 1) {
        const rel_path =
          process.platform === "win32"
            ? path.win32.relative(root, this.resourcePath)
            : path.relative(root, this.resourcePath);
        const pathName = new URL(urlPath, `http://bla.com/${rel_path}`)
          .pathname;
        if (pathName.includes(this.query.termsDir.replace(/\./, ""))) {
          const docsDir = "/" + sanitize(this.query.docsDir);
          const pathRelativeToDocsDir = path.relative(docsDir, pathName);

          const routeBasePath =
            "/" + sanitize(this.query.routeBasePath || this.query.docsDir);
          const targetPathName = path.posix.join(
            routeBasePath,
            pathRelativeToDocsDir,
          );

          const termKey =
            this.query.baseUrl.replace(/\/$/, "") +
            targetPathName.replace(/\.(md|mdx)$/, "");
          source = source.replace(
            mdUrl,
            `<Term pathName="${termKey.replace(/\d+-/, "")}">${title}</Term>`,
          );
        }
      }
    }
  }

  return source;
};
