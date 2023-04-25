const fs = require('fs')
const path = require('path')
module.exports = function (context, options) {

  const unixFormattedTermsPath = options.termsDir
  .replace(/^\.\//, '')
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const winFormattedTermsPath = options.termsDir
  .replace(/\//g, "\\")
  .replace(/\./, "")
  .replace(/[*+?^${}()|[\]\\]/g, '\\$&');

  const termsPath = process.platform === 'win32' ? winFormattedTermsPath : unixFormattedTermsPath;
  const termsRegex = new RegExp(`${termsPath}.*?\.mdx?$`);

  const unixFormattedGlossaryPath = options.glossaryFilepath
  .replace(/^\.\//, '')
  .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const winFormattedGlossaryPath = options.glossaryFilepath
  .replace(/\//g, "\\")
  .replace(/\./, "")
  .replace(/[*+?^${}()|[\]\\]/g, '\\$&');

  const glossaryPath = process.platform === 'win32' ? winFormattedGlossaryPath : unixFormattedGlossaryPath;
  const glossaryRegex = new RegExp(`${glossaryPath}`);

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
                  loader: require.resolve('@grnet/webpack-glossary-loader'),
                  options
                }
              ]
            },
            {
              test: termsRegex,
              enforce: 'pre',
              use: [
                {
                  loader: require.resolve('@grnet/webpack-terms-loader'),
                  options
                }
              ]
            }
          ];
          rule.use.push(
            {
              loader: require.resolve('@grnet/webpack-terms-replace-loader'),
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
