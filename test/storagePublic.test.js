import { get, setupTest } from '@nuxt/test-utils'

describe('module', () => {
  setupTest({
    fixture: 'fixture',
    configFile: 'nuxt.config.js',
    server: true,
    config: {
      modules: [
        ['../lib/module.js']
      ],
      badaso: {
        endpoint: 'http://localhost:8000',
        prefix: 'badaso-api',
        key: 'token'
      }
    }
  })

  it('renders', async () => {
    const { body } = await get('/storage/public')
    expect(body).toContain('@badaso/nuxt')
    expect(body).toContain('<pre>public</pre>')
    expect(body).toContain('<h2>Loaded badaso.png: false</h2>')
    expect(body).toContain('<h2>Loaded favicon.png: false</h2>')
  })
})
