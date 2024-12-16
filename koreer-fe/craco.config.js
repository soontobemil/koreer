module.exports = ({ env }) => {

// craco.config.js
  module.exports = {
    webpack: {
      configure: (webpackConfig) => {
        webpackConfig.optimization = {
          ...webpackConfig.optimization,
          usedExports: true,
        };
        return webpackConfig;
      },
    },
  };

}
