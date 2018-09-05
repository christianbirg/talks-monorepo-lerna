import originalIsBase64 from 'is-base64'

export const isBase64 = (value: any, options) => {
  return originalIsBase64(value, options)
}
