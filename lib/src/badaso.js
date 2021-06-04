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
    this.$axios = ctx.$axios.create({
      headers: {
        common: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      }
    })
    this.options = options

    this.state = Vue.observable({ user: null })

    this.syncToken()
    const endpoint = runtimeConfig.endpoint || this.options.endpoint
    const prefix = runtimeConfig.prefix || this.options.prefix

    if (process.server && ctx.req && endpoint.startsWith('/')) {
      this.$axios.setBaseURL(joinURL(reqURL(ctx.req), endpoint))
    } else {
      this.$axios.setBaseURL(joinURL(endpoint, prefix))
    }

    this.$axios.interceptors.response.use(
      (response) => {
        return Promise.resolve(response)
      },

      (error) => {
        return Promise.reject(error)
      }
    )
  }

  get user () {
    return this.state.user
  }

  set user (user) {
    Vue.set(this.state, 'user', user)
  }

  async register (data) {
    this.clearToken()
    const auth = await this.$axios.$post('/v1/auth/register', data)
    return auth
  }

  async login (data) {
    this.clearToken()
    const res = await this.$axios.$post('/v1/auth/login', data)
    this.setToken(res.data.accessToken, res.data.expiresIn)
    await this.setUser(res.data.user)
    return res
  }

  async forgotPassword (data) {
    this.clearToken()
    return await this.$axios.$post('/v1/auth/forgot-password', data)
  }

  async verifyForgotPasswordToken (data) {
    this.clearToken()
    return await this.$axios.$post('/v1/auth/forgot-password-verify', data)
  }

  async resetPassword (data) {
    this.clearToken()
    return await this.$axios.$post('/v1/auth/reset-password', data)
  }

  async sendEmailConfirmation (data) {
    this.clearToken()
    return await this.$axios.$post('/v1/auth/re-request-verification', data)
  }

  async verify (data) {
    this.clearToken()
    const auth = await this.$axios.$post('/v1/auth/verify', data)
    this.setToken(auth.data.accessToken, auth.data.expiresIn)
    await this.setUser(auth.data.user)
    return auth
  }

  async refreshToken () {
    const auth = await this.$axios.$post('/v1/auth/refresh-token')
    this.setToken(auth.data.accessToken, auth.data.expiresIn)
    return auth
  }

  async logout () {
    const auth = await this.$axios.$post('/v1/auth/logout')
    await this.setUser(null)
    this.clearToken()
    return auth
  }

  fetchUser () {
    const jwt = this.syncToken()
    if (!jwt) {
      return null
    }

    return this.user
  }

  async setUser (user) {
    this.user = user
    await this.callHook('userUpdated', user)
  }

  async browse (entity, params) {
    return await this.$axios.$get(`/${entity}`, { params })
  }

  async all (entity, params) {
    return await this.$axios.$get(`/${entity}`, { params })
  }

  async read (entity, params) {
    return await this.$axios.$get(`/${entity}/read`, { params })
  }

  async readBySlug (entity, params) {
    return await this.$axios.$get(`/${entity}/read-slug`, { params })
  }

  async readByPostSlug (entity, params) {
    return await this.$axios.$get(`/${entity}/post`, { params })
  }

  async add (entity, data) {
    return await this.$axios.$post(`/${entity}/add`, data)
  }

  async fetch (entity, params) {
    return await this.$axios.$get(`/${entity}/fetch`, { params })
  }

  async fetchMultiple (entity, params) {
    return await this.$axios.$get(`/${entity}/fetch-multiple`, { params })
  }

  async edit (entity, data) {
    return await this.$axios.$put(`/${entity}/edit`, data)
  }

  async delete (entity, data) {
    return await this.$axios.$delete(`/${entity}/delete`, { data })
  }

  async deleteMultiple (entity, data) {
    return await this.$axios.$delete(`/${entity}/delete-multiple`, { data })
  }

  async sort (entity, data) {
    return await this.$axios.$put(`/${entity}/sort`, data)
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
    this.$axios.setToken(token, 'Bearer')
  }

  clearToken () {
    this.$axios.setToken(false, 0)
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
