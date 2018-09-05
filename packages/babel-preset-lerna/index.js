'use strict'

module.exports = function () {
  return {
    presets: [require('babel-preset-env'), require('babel-preset-stage-3')],
    plugins: [
      require('babel-plugin-transform-class-properties'),
      require('babel-plugin-transform-decorators-legacy').default,
      require('babel-plugin-transform-object-rest-spread')
    ]
  }
}
