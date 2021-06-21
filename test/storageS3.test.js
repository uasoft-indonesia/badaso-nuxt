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
        key: 'token',
        driver: 's3',
        awsUrl: 'https://badaso-web.s3-ap-southeast-1.amazonaws.com'
      }
    }
  })

  it('renders', async () => {
    const { body } = await get('/storage/s3')
    expect(body).toContain('@badaso/nuxt')
    expect(body).toContain('<pre>s3</pre>')
    expect(body).toContain('<h2>Loaded capture.png: false</h2>')
    expect(body).toContain('<h2>Loaded chart.png: false</h2>')
  })
})
