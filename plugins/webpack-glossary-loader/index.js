const parseMD = require("parse-md").default;
const store = require("@b-kamphorst/terminology-store");
const path = require("path");

module.exports = function (source) {
  // Extract front matter (--- ... ---)
  const frontMatterMatch = source.match(/^---\r?\n[\s\S]*?\r?\n---(\r?\n|$)/);
  const frontMatter = frontMatterMatch ? frontMatterMatch[0] : "";
  const contentWithoutFrontMatter = frontMatterMatch
    ? source.slice(frontMatterMatch[0].length)
    : source;

  // Prepare the import statement
  const importStatement = `import Glossary from "${this.query.glossaryComponentPath || "@b-kamphorst/docusaurus-glossary-view"}";\n\n`;

  // Only add the import if it’s not already in the source
  const contentAlreadyHasImport =
    contentWithoutFrontMatter.includes(importStatement);

  source =
    frontMatter +
    (contentAlreadyHasImport ? "" : importStatement) +
    contentWithoutFrontMatter;

  this.cacheable(false);
  this.addDependency(path.posix.join(this.query.docsDir, "glossary.json"));
  this.emitFile(
    path.posix.join(this.query.docsDir, "glossary.json"),
    JSON.stringify(store.terms),
  );
  source += `

  <Glossary />

  `;

  return source;
};
