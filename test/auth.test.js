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
        prefix: 'api',
        key: 'token'
      }
    }
  })

  it('renders', async () => {
    const { body } = await get('/auth')
    expect(body).toContain('@badaso/nuxt')
    expect(body).toContain('http://localhost:8000/api')
    expect(body).toContain('<pre id="register">Request was successful</pre>')
    expect(body).toContain('<pre id="resend">Request was successful</pre>')
    expect(body).toContain('<pre id="login">Request was successful</pre>')
    expect(body).toContain('<pre id="refresh">Request was successful</pre>')
    expect(body).toContain('<pre id="logout">Request was successful</pre>')
    expect(body).toContain('<pre id="forgot">Request was successful</pre>')
  })
})
