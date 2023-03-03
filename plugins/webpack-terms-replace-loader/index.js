const parseMD = require('parse-md').default;
const store = require('@grnet/terminology-store');
const path = require('path');
const pkgUp = require('pkg-up');
const importStatement = `

import Term from "@grnet/docusaurus-term-preview";

`;

const pkg = pkgUp.sync({ cwd: process.cwd() });
const root = path.dirname(pkg);

module.exports = function(source) {
  const urlsRegex = /\[.*?\]\(.*?\)/gim;
  const urlRegex = /\[(.*?)\]\((.*?)\)/;
  const urls = source.match(urlsRegex) || [];
  if (urls.length > 0) {
    const { content } = parseMD(source);
    source = source.replace(content, importStatement + content);
    for (const url of urls) {
      const [mdUrl, title, urlPath] = url.match(urlRegex);
      const rel_path = path.relative(root, this.resourcePath);
      const pathName = new URL(urlPath, `http://bla.com/${rel_path}`).pathname;
      if (pathName.includes(this.query.termsDir.replace(/\./, ''))) {
        const termKey =
          this.query.baseUrl.replace(/\/$/, '') +
          pathName.replace(/\.(md|mdx)$/, '');
        const metadata = store.terms[termKey];
        source = source.replace(
          mdUrl,
          `<Term pathName="${termKey}">${title}</Term>`
        );
      }
    }
  }

  return source;
};
