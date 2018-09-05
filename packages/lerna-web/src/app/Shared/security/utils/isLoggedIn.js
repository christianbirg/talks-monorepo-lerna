// @flow
import { exists } from '@adapters/local-storage'

export const isLoggedIn = () => {
  return exists('Authorization')
}
