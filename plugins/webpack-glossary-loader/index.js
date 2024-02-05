const parseMD = require('parse-md').default;
const store = require('@grnet/terminology-store');
const path = require('path');

module.exports = function(source) {
  const urls = store.terms;
  const importStatement = `
import Glossary from "${ this.query.glossaryComponentPath || "@grnet/docusaurus-glossary-view"}";
  `;
  this.cacheable(false)
  this.addDependency(path.posix.join(this.query.docsDir, 'glossary.json'))
  this.emitFile(
    path.posix.join(this.query.docsDir, 'glossary.json'),
    JSON.stringify(store.terms)
  )
  const { content } = parseMD(source);
  source = source.replace(content, importStatement + content);
  source += `

  <Glossary />

  `;

  return source;
};
