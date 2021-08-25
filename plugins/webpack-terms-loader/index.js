const path = require('path');
const parseMD = require('parse-md').default;
const store = require('@digigov/terminology-store');

module.exports = function (source) {
  const regex = new RegExp(
    `(${this.query.termsDir
      .replace(/^\.\//, '')
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*?)\.(md|mdx)`
  );
  const termMatch = this.resourcePath.match(regex);
  if (termMatch) {
    store.addTerm(termMatch[1], parseMD(source));
    this.emitFile(termMatch[1]+'.json', JSON.stringify(parseMD(source)))
  }

  return source;
};
