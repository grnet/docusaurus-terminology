const parseMD = require('parse-md').default;
const store = require('@digigov/terminology-store');
const path = require('path');
const importStatement = `

import Glossary from "@digigov/docusaurus-glossary-view";

`;

module.exports = function (source) {
  const urls = store.terms;
  this.cacheable(false)
  this.addDependency(path.join(this.query.docsDir, 'glossary.json'))
  this.emitFile(
    path.join(this.query.docsDir, 'glossary.json'),
    JSON.stringify(store.terms)
  )
  const { content } = parseMD(source);
  source = source.replace(content, importStatement + content);
  source += `

  <Glossary />

  `;

  return source;
};
