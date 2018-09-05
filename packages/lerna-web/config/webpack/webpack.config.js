const webpack = require('webpack')
const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const CleanWebpackPlugin = require('clean-webpack-plugin')

const provisionConfig = require('./webpack.partial.config')

module.exports = (environment) => {
  const isProductionEnvironment = environment.NODE_ENV === 'production'
  const outputPath = isProductionEnvironment ? './dist' : './public'
  const mode = environment.MODE

  const config = provisionConfig({
    environment,
    mode,
    outputPath
  })

  config.plugins.push(
    new CleanWebpackPlugin([config.output.path], { allowExternal: true }),
    new webpack.DefinePlugin({
      'process.env.DEBUG': JSON.stringify(environment.DEBUG),
      'process.env.OBFUSCATED': JSON.stringify(process.env.OBFUSCATED || false),
      'process.env.DEVELOPMENT': JSON.stringify(environment.NODE_ENV === 'development')
    })
  )

  if (environment.WATCH) {
    config.plugins.push(
      new webpack.HotModuleReplacementPlugin(),
      new BundleAnalyzerPlugin({
        analyzerMode: 'server',
        analyzerPort: 8888,
        reportFilename: 'report.html',
        openAnalyzer: false,
        generateStatsFile: false,
        statsFilename: 'stats.json',
        statsOptions: null
      })
    )

    config.devServer = {
      open: true,
      compress: true,
      clientLogLevel: 'none',
      contentBase: path.join(__dirname, '..', './src'),
      overlay: true,
      hot: true,
      inline: true,
      quiet: true,
      historyApiFallback: true,
      watchOptions: {
        ignored: /node_modules/
      }
    }
  }

  return config
}
