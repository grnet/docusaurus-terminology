const path = require('path');
const parseMD = require('parse-md').default;
const store = require('@digigov/terminology-store');
const remark = require('remark')
const remarkHTML = require('remark-html')

module.exports = function (source) {
  const regex = new RegExp(
    `(${this.query.termsDir
      .replace(/^\.\//, '')
      .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}.*?)\.(md|mdx)`
  );
  const termMatch = this.resourcePath.match(regex);
  if (termMatch) {
    const data = parseMD(source);
    data.metadata.hoverText = data.metadata.hoverText? remark()
    .use(remarkHTML)
    .processSync(data.metadata.hoverText).contents: '';
    store.addTerm(termMatch[1], data);
    this.emitFile(termMatch[1]+'.json', JSON.stringify(data))
  }

  return source;
};
