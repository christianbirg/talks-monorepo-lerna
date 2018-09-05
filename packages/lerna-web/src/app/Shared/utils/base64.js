/* global FileReader */
import Modernizr from 'modernizr'
import { isBase64 } from '@adapters/is-base64.js'

export const isBase64Image = (value, options = {}) => {
  return isBase64PngImage(value, options) || isBase64JpegImage(value, options)
}

export const getBase64FromFile = (file) => {
  try {
    if (!Modernizr.filereader) {
      throw new Error('The File APIs are not fully supported in this browser.')
    }
  } catch (error) {
    console.error(error)
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })
}

/**
  removes the data string that prefixes the base64 string
 */
export const cleanBase64 = (file) => {
  if (isBase64Image(file)) {
    return file.replace(/^data:image\/(png|jpg);base64,/, '')
  } else {
    return file
  }
}

// checks if a given value is a base64 png image
const isBase64PngImage = (value, options = {}) => {
  return isBase64(value, options) && /^data:image\/(png);base64,/i.test(value)
}

const isBase64JpegImage = (value, options = {}) => {
  return isBase64(value, options) && /^data:image\/(jpg|jpeg);base64,/i.test(value)
}
