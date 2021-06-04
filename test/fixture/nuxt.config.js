module.exports = {
  modules: [
    ['../../lib/module.js']
  ],
  badaso: {
    endpoint: 'http://localhost:8000',
    prefix: 'badaso-api',
    key: 'token',
    entities: {
      blog: true,
      content: true,
      crud: ['api-docs']
    }
  }
}
