const CracoLessPlugin = require('craco-less')

module.exports = {
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
