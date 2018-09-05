import { getStringLength } from './index.js'

test('string length for \'React Hannover\' is counted correctly', () => {
  expect(getStringLength('React Hannover')).toBe(14)
})
