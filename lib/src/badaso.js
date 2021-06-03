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

    this.state = Vue.observable({ user: null })

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

  get user () {
    return this.state.user
  }

  set user (user) {
    Vue.set(this.state, 'user', user)
  }

  async register (data) {
    this.clearToken()
    const auth = await this.$http.$post('/v1/auth/register', data)
    return auth
  }

  async login (data) {
    this.clearToken()
    const auth = await this.$http.$post('/v1/auth/login', data)
    this.setToken(auth.data.accessToken, auth.data.expiresIn)
    await this.setUser(auth.data.user)
    return auth
  }

  forgotPassword (data) {
    this.clearToken()
    return this.$http.$post('/v1/auth/forgot-password', data)
  }

  verifyForgotPasswordToken (data) {
    this.clearToken()
    return this.$http.$post('/v1/auth/forgot-password-verify', data)
  }

  resetPassword (data) {
    this.clearToken()
    return this.$http.$post('/v1/auth/reset-password', data)
  }

  sendEmailConfirmation (data) {
    this.clearToken()
    return this.$http.$post('/v1/auth/re-request-verification', data)
  }

  async verify (data) {
    this.clearToken()
    const auth = await this.$http.$post('/v1/auth/verify', data)
    this.setToken(auth.data.accessToken, auth.data.expiresIn)
    await this.setUser(auth.data.user)
    return auth
  }

  async refreshToken () {
    const auth = await this.$http.$post('/v1/auth/refresh-token')
    this.setToken(auth.data.accessToken, auth.data.expiresIn)
    return auth
  }

  async logout () {
    const auth = await this.$http.$post('/v1/auth/logout')
    await this.setUser(null)
    this.clearToken()
    return auth
  }

  async fetchUser () {
    const jwt = this.syncToken()
    if (!jwt) {
      return null
    }

    try {
      const user = await this.$http.$get(`/}`, { searchParams })
      await this.setUser(user)
    } catch (e) {
      this.clearToken()
    }

    return this.user
  }

  async setUser (user) {
    this.user = user
    await this.callHook('userUpdated', user)
  }

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

  fetch (entity, searchParams) {
    return this.$http.$get(`/${entity}/fetch`, { searchParams })
  }

  fetchMultiple (entity, searchParams) {
    return this.$http.$get(`/${entity}/fetch-multiple`, { searchParams })
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
    const storageType = this.options.expires === 'session' ? 'sessionStorage' : 'localStorage'

    if (process.client && typeof window[storageType] !== 'undefined') {
      return window[storageType]
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

  setToken (token, expiresIn) {
    const clientStorage = this.getClientStorage()
    clientStorage && clientStorage.setItem(this.options.key, token)
    this.$cookies.set(this.options.key, token, {
      maxAge: expiresIn
    })
    this.$http.setToken(token, 'Bearer')
  }

  clearToken () {
    this.$http.setToken(false, 0)
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
