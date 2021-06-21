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
    },
    driver: 's3',
    awsUrl: 'https://badaso-web.s3-ap-southeast-1.amazonaws.com'
  }
}
