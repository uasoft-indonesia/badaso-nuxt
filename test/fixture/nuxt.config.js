module.exports = {
  modules: [
    ['../../lib/module.js']
  ],
  badaso: {
    endpoint: 'http://localhost:8000',
    prefix: 'api',
    key: 'token',
    entities: {
      post: true,
      content: true,
      crud: ['api-docs']
    }
  }
}
