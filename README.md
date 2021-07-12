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
  modules: ['@badaso/nuxt'],
  badaso: {
    // Options
  }
}
```

## Options

- **`endpoint`**
  Default: `process.env.BADASO_URL || 'http://localhost:8000'`
  URL of the Badaso server.
  Environtment variable BADASO_URL can be used to override `endpoint`.
- **`entities`**
  Default: `{}`
  You can specify the entities that present in your API. For example:
  ```js
  export default {
    badaso: {
      entities: {
        post: true,
        crud: ['articles', 'products']
      }
    }
  }
  ```
  Then you can use `this.$badaso.$post.browse()` in your application.
  For now, entities only accept:
  - `post`: `Boolean`
  - `content`: `Boolean`
  - `crud`: `Array`
- **`key`**
  Key used for the cookie name as well as localStorage/sessionStorage key.
- **`prefix`**
  Default: `badaso-api`
  URL prefix to access Badaso API server.

## Usage

### Authentication
To handle authentication in your Nuxt app with Badaso, you can:

#### Login
```js
await this.$badaso.login({ email: '', password: '' })
```

#### Register
```js
await this.$badaso.register({ email: '', name: '', password: '', passwordConfirmation: '' })
```

#### Verify
```js
await this.$badaso.verify({ email: '', token: '' })
```

#### Resend Email Verification
```js
await this.$badaso.sendEmailConfirmation({ email: '' })
```

#### Logout
```js
await this.$badaso.logout()
```

#### Forgot Password
```js
await this.$badaso.forgotPassword({ email: '' })
```

#### Verify Token for Forgot Password
```js
await this.$badaso.verifyForgotPasswordToken({ email: '', token: '' })
```

#### Reset Password
```js
await this.$badaso.resetPassword({ email: '', password: '', token: '' })
```

#### User
Once logged in, you can access your user everywhere:
```js
this.$badaso.user
```

#### Post Module
- [Post](docs/post.md)
- [Category](docs/category.md)
- [Tag](docs/tag.md)
- [Comment](docs/comment.md)

#### Content Module
For content module, please refer to [this page](docs/content.md)

#### CRUD Generated
For CRUD generated, please refer to [this page](docs/crud.md)

## Development
1. Clone this repo
2. Install dependencies using `npm install` or `yarn install`
3. Start development server using `npm run dev` or `yarn dev`
