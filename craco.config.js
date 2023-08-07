const { isEqual } = require('lodash');
const CspHtmlWebpackPlugin = require('csp-html-webpack-plugin');
const CracoAlias = require('craco-alias');
const CircularDependencyPlugin = require('circular-dependency-plugin');
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  reactScriptsVersion: 'react-scripts',
  style: {
    modules: {
      localIdentName: '',
    },
    css: {
      loaderOptions: cssLoaderOptions => {
        return cssLoaderOptions;
      },
    },
    sass: {
      loaderOptions: sassLoaderOptions => {
        return sassLoaderOptions;
      },
    },
    postcss: {
      mode: 'extends',
      plugins: [],
      env: {
        autoprefixer: {
          /* Any autoprefixer options: https://github.com/postcss/autoprefixer#options */
        },
        stage: 3 /* Any valid stages: https://cssdb.org/#staging-process. */,
        features: {
          /* Any CSS features: https://preset-env.cssdb.org/features. */
        },
      },
      loaderOptions: postcssLoaderOptions => {
        return postcssLoaderOptions;
      },
    },
  },
  webpack: {
    plugins: {
      add: [
        // https://github.com/webpack-contrib/webpack-bundle-analyzer
        /*new BundleAnalyzerPlugin({
          generateStatsFile: true,
        }),*/
        // https://github.com/aackerman/circular-dependency-plugin
        new CircularDependencyPlugin({
          exclude: /node_modules/,
          include: /\/src\/.*\/(_global_context|landing_context|AuthProvider)/,
          failOnError: true,
          allowAsyncCycles: false,
          cwd: process.cwd(),
        }),
        new CspHtmlWebpackPlugin(
          {
            'script-src': [
              '\'unsafe-inline\'',
              '\'self\'',
              '*.googleapis.com',
              'cdnjs.cloudflare.com',
              'blob:',
              'app.intercom.io',
              'js.intercomcdn.com',
              'widget.intercom.io',
            ],
            'font-src': [
              '\'self\'',
              'fonts.googleapis.com',
              'fonts.gstatic.com',
              'js.intercomcdn.com',
              'fonts.intercomcdn.com',
            ],
            'form-action': ['intercom.help', 'intercom-help.eu', 'api-iam.eu.intercom.io'],
            'style-src': ['\'unsafe-inline\'', '\'self\'', 'fonts.googleapis.com', 'fonts.gstatic.com'],
          },
          {
            enabled: true,
            hashingMethod: 'sha256',
            hashEnabled: {
              'script-src': false,
              'style-src': false,
            },
            nonceEnabled: {
              'script-src': false,
              'style-src': false,
            },
          }
        ),
      ],
      remove: [],
    },
    configure: (webpackConfig, { env }) => {
      webpackConfig.optimization = {
        chunkIds: 'named',
        splitChunks: {
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroups
          cacheGroups: {
            default: false,
            defaultVendors: false,
            mp_public_vendor: {
              // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegroupfilename
              filename: 'static/js/public/[name].[contenthash].js',

              // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksminchunks
              minChunks: 1,

              // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegrouppriority
              priority: 0,

              // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegroupreuseexistingchunk
              reuseExistingChunk: true,

              // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkscachegroupscachegrouptest
              test: /\/node_modules\/(big|css-loader|react-i18next|html-parse-stringify|void-elements|html-escaper|axios|follow-redirects|@googlemaps|fast-deep-equal|libphonenumber|rc-|react-phone-number|input-format|country-flag-icons|@babel|babel|core-js-pure|regenerator-runtime|@appsignal\/javascript|@appsignal\/plugin-window-events|isomorphic-unfetch|@dknmz|antd|moment|scroll-into-view-if-needed|copy-to-clipboard|memoize-one|@ant|pdfjs|classnames|formik|tiny-warning|tslib|hoist-non-react-statics|deepmerge|react|react-dom|loose-envify|scheduler|react-helmet|object-assign|react-fast-compare|react-side-effect|prop-types|react-router-dom|react-router|history|react-toastify|clsx|yup|lodash|synchronous-promise|property-expr|fn-name|toposort)/,
            },
            mp_private_vendor: {
              filename: 'static/js/private/[name].[contenthash].js',
              reuseExistingChunk: true,
              test: /\/node_modules\/(?!(big|css-loader|react-i18next|html-parse-stringify|void-elements|html-escaper|axios|follow-redirects|@googlemaps|fast-deep-equal|libphonenumber|rc-|react-phone-number|input-format|country-flag-icons|@babel|babel|core-js-pure|regenerator-runtime|@appsignal\/javascript|@appsignal\/plugin-window-events|isomorphic-unfetch|@dknmz|antd|moment|scroll-into-view-if-needed|copy-to-clipboard|memoize-one|@ant|pdfjs|classnames|formik|tiny-warning|tslib|hoist-non-react-statics|deepmerge|react|react-dom|loose-envify|scheduler|react-helmet|object-assign|react-fast-compare|react-side-effect|prop-types|react-router-dom|react-router|history|react-toastify|clsx|yup|lodash|synchronous-promise|property-expr|fn-name|toposort))/,
            },
            mp_public_app: {
              filename: 'static/js/public/[name].[contenthash].js',
              reuseExistingChunk: true,
              test: /\/src\/(images|index|serviceWorker|stylesheets|.*_global_context|.*landing_context|.*AuthProvider)/,
            },
            mp_private_app: {
              filename: 'static/js/private/[name].[contenthash].js',
              reuseExistingChunk: true,
              test: /\/src\/(?!images|index|serviceWorker|stylesheets|.*\/_global_context|.*\/landing_context|\/.*AuthProvider)/,
            },
          },
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunkschunks
          chunks: 'async',
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksenforcesizethreshold
          enforceSizeThreshold: 50000,
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksmaxasyncrequests
          maxAsyncRequests: 30,
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksmaxinitialrequests
          maxInitialRequests: 30,
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksminchunks
          minChunks: 1,
          // https://webpack.js.org/plugins/split-chunks-plugin/#splitchunksminsize
          minSize: 50,
        },
      };
      /**
       * in order to use unreleased mp ui build,
       * manually copy-pasted to node_modules,
       * one may need to disable webpack cache
       * @see https://webpack.js.org/configuration/cache/
       */
      webpackConfig.cache = true;

      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        rule => !isEqual(rule, { parser: { requireEnsure: false } })
      );
      webpackConfig.plugins = webpackConfig.plugins.filter(element => {
        if (element.options) {
          return !Object.prototype.hasOwnProperty.call(element.options, 'ignoreOrder');
        }
        return true;
      });
      webpackConfig.module.rules.push({
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      });
      webpackConfig.module.rules = webpackConfig.module.rules.filter(
        rule => rule.test && rule.test.toString().indexOf('css') == -1
      );
      webpackConfig.module.rules.push({
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      });
      webpackConfig.module.rules.push({
        test: /\.(woff|woff2|otf|ttf|eot|svg|png|jpg)$/,
        use: ['file-loader'],
      });
      webpackConfig.module.rules.push({
        test: /\.less$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                javascriptEnabled: true,
              },
            },
          },
        ],
      });
      webpackConfig.module.rules.push({
        test: /\.scss$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options:
              env === 'development'
                ? {
                    modules: {
                      auto: true,
                      localIdentName: '[name]__[local]--[hash:base64:5]',
                    },
                  }
                : {},
          },
          'postcss-loader',
          'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      });
      webpackConfig.module.rules.push({
        test: /\.graphql$/,
        use: [{ loader: 'graphql-tag/loader' }],
      });
      return webpackConfig;
    },
  },
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: 'tsconfig',
        baseUrl: '.',
        tsConfigPath: './tsconfig.paths.json',
      },
    },
  ],
};
