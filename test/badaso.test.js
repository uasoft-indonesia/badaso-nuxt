import { get, setupTest } from '@nuxt/test-utils'

describe('module', () => {
  setupTest({
    fixture: 'fixture',
    configFile: 'nuxt.config.js',
    server: true,
    config: {
      badaso: {
        endpoint: 'http://localhost:3000'
      }
    }
  })

  it('renders', async () => {
    const { body } = await get('/')
    expect(body).toContain('@badaso/nuxt')
    expect(body).toContain('http://localhost:3000')
  })
})
