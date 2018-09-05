// @flow

import JSDOM from 'jsdom'

export const dom = new JSDOM(``, {
  url: 'http://localhost'
})
