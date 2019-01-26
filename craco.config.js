const CracoLessPlugin = require('craco-less')
const { BugsnagBuildReporterPlugin } = require('webpack-bugsnag-plugins')

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

if (webpackConfigs.plugins && process.env.NODE_ENV === 'production') {
  webpackConfigs.plugins.push(
    new BugsnagBuildReporterPlugin(
      {
        apiKey: process.env.REACT_APP_BUGSNAG_API_KEY,
        appVersion: process.env.REACT_APP_VERSION
      },
      {
        /* opts */
      }
    )
  )
}

module.exports = webpackConfigs
