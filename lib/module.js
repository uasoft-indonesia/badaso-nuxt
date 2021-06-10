import { resolve } from 'path'
import defu from 'defu'
import { name, version } from '../package.json'

const defaults = {
  endpoint: process.env.BADASO_URL || 'http://localhost:8000',
  entities: {
    crud: []
  },
  prefix: 'badaso-api',
  key: 'token'
}

async function badasoModule (_moduleOptions) {
  const { nuxt } = this

  const moduleOptions = defu(nuxt.options.badaso, _moduleOptions, defaults)

  nuxt.options.publicRuntimeConfig = nuxt.options.publicRuntimeConfig || {}
  nuxt.options.publicRuntimeConfig.badaso = nuxt.options.publicRuntimeConfig.badaso || {}
  nuxt.options.publicRuntimeConfig.badaso.endpoint = moduleOptions.endpoint
  nuxt.options.publicRuntimeConfig.badaso.prefix = moduleOptions.prefix

  const runtimeDir = resolve(__dirname, 'src')
  nuxt.options.alias['~badaso'] = runtimeDir
  nuxt.options.build.transpile.push(runtimeDir, 'destr', 'requrl', 'hookable', 'ufo')

  this.addPlugin({
    src: resolve(runtimeDir, 'plugin.js'),
    fileName: 'badaso.js',
    options: moduleOptions
  })

  await this.requireModule('@nuxtjs/axios')
  await this.requireModule('cookie-universal-nuxt')

  nuxt.hook('error', (err) => {
    throw err
  })
}

badasoModule.meta = { name, version }

export default badasoModule
