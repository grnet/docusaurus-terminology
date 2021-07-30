module.exports = function (context, options) {
  const formattedTermsPath = options.termsDir
    .replace(/^\.\//, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const termsRegex = new RegExp(`${formattedTermsPath}.*?\.md`);
  const formattedGlossaryPath = options.glossaryFilepath
    .replace(/^\.\//, '')
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const glossaryRegex = new RegExp(`${formattedGlossaryPath}`);
  const GlossaryPlugin = require('@digigov/webpack-glossary-plugin');

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
      return {
        plugins: [new GlossaryPlugin(options)],
      };
    },
  };
};