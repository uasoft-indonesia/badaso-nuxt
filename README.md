# @badaso/nuxt
Nuxt module for integration with badaso out of the box.

## Features

  - RESTful methods
  - Handle errors with hooks

## Installation

Using [npm](https://docs.npmjs.com/cli/v6/commands/npm):

```
npm install @badaso/nuxt
```

Using [yarn](https://yarnpkg.com/):

```
yarn add @badaso/nuxt
```

## Configure

Add @badaso/nuxt to the modules section of nuxt.config.js:
```js
export default {
  modules: ['@nuxtjs/strapi'],
  strapi: {
    // Options
  }
}
```

## Options

- `endpoint`
  Default: `process.env.BADASO_URL || 'http://localhost:8000'`
  URL of the Badaso server.
  Environtment variable BADASO_URL can be used to override `endpoint`.
- `entities`
  Will be implemented soon.
- `key`
  Will be implemented soon.
- `prefix`
  Default: `badaso-api`
  URL prefix to access Badaso API server.

## Usage

- [`this.$badaso.$post`](docs/post.md)
- [`this.$badaso.$category`](docs/category.md)
- [`this.$badaso.$tag`](docs/tag.md)
- [`this.$badaso.$comment`](docs/comment.md)

## Development

1. Clone this repo
2. Install dependencies using `npm install` or `yarn install`
3. Start development server using `npm run dev` or `yarn dev`
