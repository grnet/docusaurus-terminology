const parseMD = require("parse-md").default;
const store = require("@b-kamphorst/terminology-store");
const path = require("path");

module.exports = function (source) {
  const importStatement = `
import Glossary from "${this.query.glossaryComponentPath || "@b-kamphorst/docusaurus-glossary-view"}";
  `;
  this.cacheable(false);
  this.addDependency(path.posix.join(this.query.docsDir, "glossary.json"));
  this.emitFile(
    path.posix.join(this.query.docsDir, "glossary.json"),
    JSON.stringify(store.terms),
  );
  const { content } = parseMD(source);
  source = source.replace(content, importStatement + content);
  source += `

  <Glossary />

  `;

  return source;
};
