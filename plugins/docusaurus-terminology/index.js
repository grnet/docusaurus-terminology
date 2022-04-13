const fs = require('fs')
const path = require('path')
module.exports = function (context, options) {
  const formattedTermsPath = options.termsDir
    .replace(/^\.\//, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const termsRegex = new RegExp(`${formattedTermsPath}.*?\.mdx?$`);
  const formattedGlossaryPath = options.glossaryFilepath
    .replace(/^\.\//, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const glossaryRegex = new RegExp(`${formattedGlossaryPath}`);
  try {
    fs.rmdirSync('node_modules/.cache', { recursive: true })
  } catch (err) {

  }
  return {
    name: 'terminology-docusaurus-plugin',
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
      const newRules = config.module.rules.map(rule => {
        if (rule.use && rule.use.some(({ loader }) => loader && loader.includes("plugin-content-docs"))) {
          rule.oneOf = [
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
          rule.use.push(
            {
              loader: require.resolve('@digigov/webpack-terms-replace-loader'),
              options
            }
          )
        }
        return rule;
      });
      config.module.rules = newRules;
      return {
        mergeStrategy: { 'module': 'replace' },
        module: config.module
      };
    },
  };
};
