const path = require('path');
const parseMD = require('parse-md').default;
const store = require('../../docusaurus/terminology/store.js');

module.exports = function(source) {
  const regex = new RegExp(
    `(${this.query.termsDir
      .replace(/^\.\//, '')
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*?)\.(md|mdx)`
  );
  const termMatch = this.resourcePath.match(regex);
  if(termMatch) {
    store.addTerm(termMatch[1], parseMD(source));
  }

  return source;
}
