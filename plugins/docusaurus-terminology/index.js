const fs = require('fs')
const path = require('path')
module.exports = function (context, options) {
  const formattedTermsPath = options.termsDir
    .replace(/^\.\//, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const termsRegex = new RegExp(`${formattedTermsPath}.*?\.md`);
  const formattedGlossaryPath = options.glossaryFilepath
    .replace(/^\.\//, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const glossaryRegex = new RegExp(`${formattedGlossaryPath}`);
  try{
    fs.rmdirSync('node_modules/.cache', {recursive:true})
  }catch(err){

  }
  return {
    name: 'terminology-docusaurus-plugin',
    async postBuild({siteConfig = {}, routesPaths = [], outDir}) {
      const glossary = fs.readFileSync('.docusaurus/glossary.json').toString()
      const glossaryJSON = JSON.parse(glossary)
      fs.writeFileSync(path.join(outDir, options.docsDir, 'glossary.json'), glossary)
      for(const term of Object.keys(glossaryJSON)){
        fs.writeFileSync(path.join(outDir,`${term}.json` ), JSON.stringify(glossaryJSON[term]))
      }
    },
    configureWebpack(config, isServer, utils) {
      options.baseUrl = config.output.publicPath;
      // prefix baseUrl in options.glossaryTerms
      if (!options.resolved) {
        for (const term in options.glossaryTerms) {
          options.glossaryTerms[`${config.output.publicPath}${term}`] = options.glossaryTerms[term];
          delete options.glossaryTerms[term];
        }
      }
      options.resolved = true;
      config.module.rules = config.module.rules.map(rule => {
        if (rule.use && rule.use.some(({ loader }) => loader && loader.includes("plugin-content-docs"))) {
          rule.rules = [
            {
              test: glossaryRegex,
              enforce: 'pre',
              use: [
                {
                  loader: require.resolve('@digigov/webpack-glossary-loader'),
                  options
                }
              ]
            },
            {
              enforce: 'pre',
              use: [
                {
                  loader: require.resolve('@digigov/webpack-terms-replace-loader'),
                  options
                }
              ]
            },
            {
              test: termsRegex,
              enforce: 'pre',
              use: [
                {
                  loader: require.resolve('@digigov/webpack-terms-loader'),
                  options
                }
              ]
            }
          ];
        }
        return rule;
      });
      return {};
    },
  };
};