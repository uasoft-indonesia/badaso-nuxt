import { get, setupTest } from '@nuxt/test-utils'

describe('module', () => {
  setupTest({
    fixture: 'fixture',
    configFile: 'nuxt.config.js',
    server: true,
    config: {
      badaso: {
        endpoint: 'http://localhost:8000'
      }
    }
  })

  it('renders', async () => {
    const { body } = await get('/crud')
    expect(body).toContain('@badaso/nuxt')
    expect(body).toContain('http://localhost:8000/badaso-api')
    expect(body).toContain('<pre>Login: Request was successful</pre>')
    expect(body).toContain('<pre>Browse: Request was successful</pre>')
    expect(body).toContain('<pre>Read: Request was successful</pre>')
    expect(body).toContain('<pre>Add: Request was successful</pre>')
    expect(body).toContain('<pre>Edit: Request was successful</pre>')
    expect(body).toContain('<pre>Delete: Request was successful</pre>')
  })
})
