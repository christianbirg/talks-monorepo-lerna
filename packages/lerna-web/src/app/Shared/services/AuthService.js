// @flow
import uuidv1 from 'uuid/v1'

import {
  setItem
} from '@adapters/local-storage.js'

export const login = ({ email }: { email: string }) => {
  setItem('Authorization', `${email}/${uuidv1()}`)
}
