const CracoLessPlugin = require('craco-less')
const {
  BugsnagBuildReporterPlugin,
  BugsnagSourceMapUploaderPlugin
} = require('webpack-bugsnag-plugins')

const webpackConfigs = {
  babel: {
    presets: [],
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'es', style: true }]
    ]
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          modifyVars: {
            '@primary-color': '#ffb151'
          },
          javascriptEnabled: true
        }
      }
    }
  ]
}

if (process.env.NODE_ENV === 'production') {
  webpackConfigs.plugins.concat(
    new BugsnagBuildReporterPlugin({
      apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
      appVersion: process.env.REACT_APP_VERSION,
      releaseStage: 'production'
    }),
    new BugsnagSourceMapUploaderPlugin({
      apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
      appVersion: process.env.REACT_APP_VERSION
    })
  )
}

module.exports = webpackConfigs
