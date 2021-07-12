import { get, setupTest } from '@nuxt/test-utils'

describe('module', () => {
  setupTest({
    fixture: 'fixture',
    configFile: 'nuxt.config.js',
    server: true,
    config: {
      badaso: {
        endpoint: 'http://localhost:8000',
        entities: {
          post: true,
          content: true
        },
        prefix: 'api'
      }
    }
  })

  it('renders', async () => {
    const { body } = await get('/post')
    expect(body).toContain('http://localhost:8000/api')
    expect(body).toContain('<pre>Post-Browse: true</pre>')
    expect(body).toContain('<pre>Post-Popular: true</pre>')
    expect(body).toContain('<pre>Post-ReadBySlug: true</pre>')

    expect(body).toContain('<pre>Category-Browse: true</pre>')
    expect(body).toContain('<pre>Category-Read: true</pre>')
    expect(body).toContain('<pre>Category-ReadBySlug: true</pre>')

    expect(body).toContain('<pre>Tag-Browse: true</pre>')
    expect(body).toContain('<pre>Tag-Read: true</pre>')
    expect(body).toContain('<pre>Tag-ReadBySlug: true</pre>')

    expect(body).toContain('<pre>Comment-ReadByPostSlug: true</pre>')
    expect(body).toContain('<pre>Comment-Add: true</pre>')
  })
})
