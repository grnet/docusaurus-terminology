const fs = require('fs');
const path = require('path');
const docusaurusPath = path.resolve('.docusaurus');
const glossaryPath = path.resolve('.docusaurus/glossary.json');

class TerminologyStore {
  constructor() {
    // Why use a map??? JUST FOR FUN ¯\_(ツ)_/¯
    this.terms = {};

    if (!fs.existsSync(docusaurusPath)) {
      fs.mkdirSync(docusaurusPath);
    }

    if (!fs.existsSync(glossaryPath)) {
      fs.writeFileSync(glossaryPath, '{}');
    }

    this.terms = this.readGlossary();
    this.updated = Object.keys(this.terms);
  }

  addTerm(resourcePath, metadata) {
    this.terms[resourcePath] = metadata;
    fs.writeFileSync(glossaryPath, JSON.stringify(this.terms));
    this.setUpdatedResourcePath(resourcePath);
    return { resourcePath };
  }

  readGlossary() {
    return JSON.parse(fs.readFileSync(glossaryPath, 'utf8'));
  }

  setUpdatedResourcePath(resourcePath) {
    this.updated.push(resourcePath);
  }

  clearUpdatedResourcePaths() {
    this.updated = [];
  }
}
module.exports = new TerminologyStore()
