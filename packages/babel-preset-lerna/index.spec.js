const babelConfig = require('./index.js')

test('is exporting presets', () => {
  const babelPresetConfig = babelConfig()
  expect(babelPresetConfig).toHaveProperty('presets')
  expect(babelPresetConfig).toHaveProperty('plugins')
})
