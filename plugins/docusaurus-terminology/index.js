module.exports = function (context, options) {
  const formattedTermsPath = options.termsDir
    .replace(/^\.\//, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const termsRegex = new RegExp(`${formattedTermsPath}.*?\.md`);
  const formattedGlossaryPath = options.glossaryFilepath
    .replace(/^\.\//, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const glossaryRegex = new RegExp(`${formattedGlossaryPath}`);
  const GlossaryPlugin = require('../../webpack/glossary-plugin/index.js');

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
      config.module.rules = config.module.rules.map(rule => {
        if (rule.use.some(({ loader }) => loader && loader.includes("plugin-content-docs"))) {
          rule.rules = [
            {
              test: glossaryRegex,
              enforce: 'pre',
              use: [
                {
                  loader: require.resolve('../../webpack/glossary-loader/index.js'),
                  options
                }
              ]
            },
            {
              enforce: 'pre',
              use: [
                {
                  loader: require.resolve('../../webpack/terms-replace-loader/index.js'),
                  options
                }
              ]
            },
            {
              test: termsRegex,
              enforce: 'pre',
              use: [
                {
                  loader: require.resolve('../../webpack/terms-loader/index.js'),
                  options
                }
              ]
            }
          ];
        }
        return rule;
      });
      return {
        plugins: [new GlossaryPlugin(options)],
      };
    },
  };
};
