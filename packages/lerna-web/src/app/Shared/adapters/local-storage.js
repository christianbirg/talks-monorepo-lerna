// @flow
import Modernizr from 'modernizr'

const checkBrowserSupport = (): void => {
  if (!Modernizr.localstorage) throw new Error('LocalStorage not supported by browser')
}

export const setItem = (key: string, value: any): boolean | void => {
  checkBrowserSupport()

  window.localStorage.setItem(key, JSON.stringify(value))
  return true
}

export const getItem = (key: string): string | any | void => {
  checkBrowserSupport()

  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (error) {
    throw error
  }
}

export const removeItem = (key: string): void => {
  checkBrowserSupport()

  try {
    window.localStorage.removeItem(key)
  } catch (error) {
    throw error
  }
}

export const exists = (key: string): boolean => {
  checkBrowserSupport()

  try {
    const item = getItem(key)
    return !!item
  } catch (e) {
    return false
  }
}
