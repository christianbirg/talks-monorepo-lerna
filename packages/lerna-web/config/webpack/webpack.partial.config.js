const path = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin')

module.exports = ({ environment, mode, outputPath }) => {
  const projectRoot = path.join(__dirname, '../..')

  return {
    context: path.resolve(projectRoot, './src'),
    entry: './index.js',
    output: {
      path: path.resolve(projectRoot, outputPath),
      filename: '[name].js'
    },
    resolve: {
      alias: {
        modernizr$: path.join(projectRoot, '.modernizrrc'),
        config: path.resolve(projectRoot, 'config/environments/' + environment.NODE_ENV + '.js'),
        '@shared': path.join(projectRoot, 'src/app/Shared'),
        '@forms': path.join(projectRoot, 'src/app/Shared/forms'),
        '@utils': path.join(projectRoot, 'src/app/Shared/utils'),
        '@services': path.join(projectRoot, 'src/app/Shared/services'),
        '@adapters': path.join(projectRoot, 'src/app/Shared/adapters'),
        '@components': path.join(projectRoot, 'src/app/Shared/components'),
        '@security': path.join(projectRoot, 'src/app/Shared/security'),
        '@theme': path.join(projectRoot, 'src/app/Shared/theme'),
        '@constants': path.join(projectRoot, 'src/app/Shared/constants')
      },
      extensions: ['.js', '.json', '.jsx']
    },
    mode,
    module: {
      rules: [
        {
          test: /(\.txt|\.webapp|manifest\.json)$/,
          use: {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]'
            }
          }
        },
        {
          test: /\.modernizrrc$/,
          use: ['modernizr-loader']
        },
        {
          test: /\.json$/,
          use: ['json-loader']
        },
        {
          exclude: /node_modules/,
          test: /\.(js|jsx|mjs)$/,
          use: 'babel-loader'
        },
        {
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        },
        {
          test: /\.css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader'
            }
          ]
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader'
            }
          ]
        },

        {
          test: /\.svg$/,
          use: [
            {
              loader: 'raw-loader'
            }
          ]
        },
        {
          exclude: [
            /(\.txt|\.webapp|manifest\.json)$/,
            /\.modernizrrc$/,
            /\.json$/,
            /\.html$/,
            /\.(js|jsx|mjs)$/,
            /\.css$/,
            /\.json$/,
            /\.svg$/,
            /\.(graphql|gql)$/,
            /particles\.js/
          ],
          use: [
            {
              loader: 'url-loader',
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]'
              }
            }
          ]
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: true,
        template: './index.html'
      }),
      new CaseSensitivePathsPlugin()
    ],
    optimization: {
      splitChunks: {
        chunks: 'async',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: -10,
            name: 'vendors',
            chunks: 'all'
          },
          default: {
            minChunks: 2,
            priority: -20,
            reuseExistingChunk: true
          }
        }
      }
    }
  }
}
