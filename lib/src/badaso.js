import Vue from 'vue'
import Hookable from 'hookable'
import destr from 'destr'
import reqURL from 'requrl'
import { joinURL } from 'ufo'

export class Badaso extends Hookable {
  constructor (ctx, options) {
    super()

    ctx.$config = ctx.$config || {} // fallback for Nuxt < 2.13
    const runtimeConfig = ctx.$config.badaso || {}
    this.$cookies = ctx.app.$cookies
    this.$http = ctx.$http.create({})
    this.options = options

    this.state = Vue.observable({ token: null })

    this.syncToken()
    const endpoint = runtimeConfig.endpoint || this.options.endpoint
    const prefix = runtimeConfig.prefix || this.options.prefix

    if (process.server && ctx.req && endpoint.startsWith('/')) {
      this.$http.setBaseURL(joinURL(reqURL(ctx.req), endpoint))
    } else {
      this.$http.setBaseURL(joinURL(endpoint, prefix))
    }

    this.$http.onError((err) => {
      if (!err.response) {
        this.callHook('error', err)
        return
      }

      const { response: { data: { message: msg } } } = err

      let message
      if (Array.isArray(msg)) {
        message = msg[0].messages[0].message
      } else if (typeof msg === 'object' && msg !== null) {
        message = msg.message
      } else {
        message = msg
      }

      err.message = message
      this.callHook('error', err)
    })
  }

  // async register (data) {
  //   this.clearToken()
  //   const { user, jwt } = await this.$http.$post('/auth/local/register', data)
  //   this.setToken(jwt)
  //   await this.setUser(user)
  //   return { user, jwt }
  // }

  // async login (data) {
  //   this.clearToken()
  //   const { user, jwt } = await this.$http.$post('/auth/local', data)
  //   this.setToken(jwt)
  //   await this.setUser(user)
  //   return { user, jwt }
  // }

  // forgotPassword (data) {
  //   this.clearToken()
  //   return this.$http.$post('/auth/forgot-password', data)
  // }

  // async resetPassword (data) {
  //   this.clearToken()
  //   const { user, jwt } = await this.$http.$post('/auth/reset-password', data)
  //   this.setToken(jwt)
  //   await this.setUser(user)
  //   return { user, jwt }
  // }

  // sendEmailConfirmation (data) {
  //   return this.$http.$post('/auth/send-email-confirmation', data)
  // }

  // async logout () {
  //   await this.setUser(null)
  //   this.clearToken()
  // }

  // async fetchUser () {
  //   const jwt = this.syncToken()
  //   if (!jwt) {
  //     return null
  //   }

  //   try {
  //     const user = await this.findOne('users', 'me')
  //     await this.setUser(user)
  //   } catch (e) {
  //     this.clearToken()
  //   }

  //   return this.user
  // }

  // async setUser (user) {
  //   this.user = user
  //   await this.callHook('userUpdated', user)
  // }

  browse (entity, searchParams) {
    return this.$http.$get(`/${entity}`, { searchParams })
  }

  all (entity, searchParams) {
    return this.$http.$get(`/${entity}`, { searchParams })
  }

  read (entity, searchParams) {
    return this.$http.$get(`/${entity}/read`, { searchParams })
  }

  readBySlug (entity, searchParams) {
    return this.$http.$get(`/${entity}/read-slug`, { searchParams })
  }

  readByPostSlug (entity, searchParams) {
    return this.$http.$get(`/${entity}/post`, { searchParams })
  }

  add (entity, data) {
    return this.$http.$post(`/${entity}/add`, data)
  }

  edit (entity, data) {
    return this.$http.$put(`/${entity}/edit`, data)
  }

  delete (entity, data) {
    return this.$http.$delete(`/${entity}/delete`, data)
  }

  deleteMultiple (entity, data) {
    return this.$http.$delete(`/${entity}/delete-multiple`, data)
  }

  getClientStorage () {
    if (process.client && typeof window.localStorage !== 'undefined') {
      return window.localStorage
    }
    return null
  }

  getToken () {
    let token
    const clientStorage = this.getClientStorage()
    if (clientStorage) {
      const session = destr(clientStorage.getItem(this.options.key))
      if (session) {
        token = session.token
      }
    }
    if (!token) {
      token = this.$cookies.get(this.options.key)
    }
    return token
  }

  setToken (token) {
    const clientStorage = this.getClientStorage()
    clientStorage && clientStorage.setItem(this.options.key, token)
    this.$cookies.set(this.options.key, token, {
      maxAge: 60 * 60
    })
    this.$http.setToken(token, 'Bearer')
  }

  clearToken () {
    this.$http.setToken(false)
    const clientStorage = this.getClientStorage()
    clientStorage && clientStorage.removeItem(this.options.key)
    this.$cookies.remove(this.options.key)
  }

  syncToken (jwt) {
    if (!jwt) {
      jwt = this.getToken()
    }

    if (jwt) {
      this.setToken(jwt)
    } else {
      this.clearToken()
    }
    return jwt
  }
}
