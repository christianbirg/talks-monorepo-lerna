// fetch polyfill
import 'babel-polyfill'

// normalize browser styles
import 'normalize.css/normalize.css'

// imports on top level of output
import './index.html'
// import './manifest.webapp'
import './humans.txt'
// import './manifest.json'
import './robots.txt'

// entry point
import './app/index.js'

// declare global variables for development
if (process.env.DEVELOPMENT) {
  window.Modernizr = require('modernizr')
}
