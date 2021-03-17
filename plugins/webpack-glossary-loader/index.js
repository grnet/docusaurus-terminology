const parseMD = require('parse-md').default;
const store = require('../../docusaurus/terminology/store.js');
const path = require('path');
const importStatement = `

import Glossary from "@digigov/docusaurus-glossary-view";

`;

module.exports = function (source) {
  const urls = store.terms;
  const { content } = parseMD(source);
  source = source.replace(content, importStatement + content);
  source += `

  <Glossary />

  `

  return source;
}
