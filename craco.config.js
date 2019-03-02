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
            // '@primary-color': '#ffb151'
          },
          javascriptEnabled: true
        }
      }
    }
  ]
}

if (process.env.NODE_ENV === 'production') {
  webpackConfigs.plugins = webpackConfigs.plugins.concat(
    {
      plugin: BugsnagBuildReporterPlugin,
      options: {
        apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
        appVersion: process.env.REACT_APP_VERSION,
        releaseStage: 'production'
      }
    },
    {
      plugin: BugsnagSourceMapUploaderPlugin,
      options: {
        apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
        appVersion: process.env.REACT_APP_VERSION
      }
    }
  )
}

module.exports = webpackConfigs
