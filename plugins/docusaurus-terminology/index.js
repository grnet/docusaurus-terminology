const fs = require("fs");
module.exports = function (_context, options) {
  const unixFormattedTermsPath = options.termsDir
    .replace(/^\.\//, "")
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const winFormattedTermsPath = options.termsDir
    .replace(/\//g, "\\")
    .replace(/^\.\\/, "")
    .replace(/[*+?^${}()|[\]\\]/g, "\\$&");

  const termsPath =
    process.platform === "win32"
      ? winFormattedTermsPath
      : unixFormattedTermsPath;
  const termsRegex = new RegExp(`${termsPath}.*?\.mdx?$`);

  const unixFormattedGlossaryPath = options.glossaryFilepath
    .replace(/^\.\//, "")
    .replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

  const winFormattedGlossaryPath = options.glossaryFilepath
    .replace(/\//g, "\\")
    .replace(/^.\\/, "")
    .replace(/[*+?^${}()|[\]\\]/g, "\\$&");

  const glossaryPath =
    process.platform === "win32"
      ? winFormattedGlossaryPath
      : unixFormattedGlossaryPath;
  const glossaryRegex = new RegExp(`${glossaryPath}`);

  try {
    fs.rmdirSync("node_modules/.cache", { recursive: true });
  } catch (err) {}
  return {
    name: "terminology-docusaurus-plugin",
    configureWebpack(config) {
      options.baseUrl = config.output.publicPath;
      // prefix baseUrl in options.glossaryTerms
      if (!options.resolved) {
        for (const term in options.glossaryTerms) {
          options.glossaryTerms[`${config.output.publicPath}${term}`] =
            options.glossaryTerms[term];
          delete options.glossaryTerms[term];
        }
      }
      options.resolved = true;
      let rule = config.module.rules.find((rule) => {
        return (
          rule.use &&
          rule.use.some(({ loader }) => loader.includes("plugin-content-docs"))
        );
      });

      if (!rule) {
        rule = config.module.rules.find((rule) => {
          return (
            rule.use &&
            rule.use.some(({ loader }) => loader.includes("mdx-loader"))
          );
        });
      }

      if (!rule) {
        const testMdFilename = "test.md";
        const testMdxFilename = "test.mdx";
        rule = config.module.rules.find((rule) => {
          const ruleRegExp = new RegExp(rule.test);

          return (
            ruleRegExp.test(testMdFilename) && ruleRegExp.test(testMdxFilename)
          );
        });
      }

      if (rule) {
        rule.oneOf = [
          {
            test: glossaryRegex,
            enforce: "pre",
            use: [
              {
                loader: require.resolve("@b-kamphorst/webpack-glossary-loader"),
                options,
              },
            ],
          },
          {
            test: termsRegex,
            enforce: "pre",
            use: [
              {
                loader: require.resolve("@b-kamphorst/webpack-terms-loader"),
                options,
              },
            ],
          },
        ];
        rule.use.push({
          loader: require.resolve("@b-kamphorst/webpack-terms-replace-loader"),
          options,
        });
      }
      return {
        mergeStrategy: { module: "replace" },
        module: config.module,
      };
    },
  };
};
