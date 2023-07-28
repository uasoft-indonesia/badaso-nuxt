import { Hookable } from "hookable";
import destr from 'destr'
import reqURL from 'requrl'
import { joinURL } from 'ufo'
import $axios from 'axios'
import { reactive } from "vue";

export class Badaso extends Hookable {
  $cookies: any;
  $axios: any;
  options: any;
  state: any;

  constructor(ctx: any, options: any) {
    super();

    ctx.$config = ctx.$config || {}; // fallback for Nuxt < 2.13
    const runtimeConfig = ctx.$config.badaso || {};
    // const runtimeConfig = useRuntimeConfig().public.badaso;
    this.$cookies = ctx.app.$cookies;
    this.$axios = $axios.create({
      headers: {
        common: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    });
    this.$axios.setHeader = (name: string | number, value: any, scopes = "common") => {
      for (const scope of Array.isArray(scopes) ? scopes : [scopes]) {
        if (!value) {
          delete this.$axios.defaults.headers[scope][name];
          continue;
        }
        this.$axios.defaults.headers[scope][name] = value;
      }
    };
    this.$axios.setToken = (token: string, type: string, scopes = "common") => {
      const value = !token ? null : (type ? type + " " : "") + token;
      this.$axios.setHeader("Authorization", value, scopes);
    };
    this.$axios.setBaseURL = (baseUrl: any) => {
      this.$axios.defaults.baseURL = baseUrl;
    };

    this.options = options;
    this.state = reactive({ user: null });

    this.syncToken();
    const endpoint = runtimeConfig.endpoint || this.options.endpoint;
    const prefix = runtimeConfig.prefix || this.options.prefix;

    if (process.server && ctx.req && endpoint.startsWith("/")) {
      this.$axios.setBaseURL(joinURL(reqURL(ctx.req), endpoint));
    } else {
      this.$axios.setBaseURL(joinURL(endpoint, prefix));
    }

    this.$axios.interceptors.response.use(
      (response: any) => {
        return Promise.resolve(response);
      },

      (error: any) => {
        return Promise.reject(error);
      }
    );
  }

  get user() {
    return this.state.user;
  }

  set user(user) {
    this.state['user'] = user;
  }

  register(data: any) {
    this.clearToken();
    return this.$axios
      .post("/v1/auth/register", data)
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  async login(data: any) {
    this.clearToken();
    const res = await this.$axios.post("/v1/auth/login", data);
    this.setToken(res.data.data.accessToken, res.data.data.expiresIn);
    await this.setUser(res.data.data.user);
    return res.data;
  }

  forgotPassword(data: any) {
    this.clearToken();
    return this.$axios
      .post("/v1/auth/forgot-password", data)
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  verifyForgotPasswordToken(data: any) {
    this.clearToken();
    return this.$axios
      .post("/v1/auth/forgot-password-verify", data)
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  resetPassword(data: any) {
    this.clearToken();
    return this.$axios
      .post("/v1/auth/reset-password", data)
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  sendEmailConfirmation(data: any) {
    this.clearToken();
    return this.$axios
      .post("/v1/auth/re-request-verification", data)
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  async verify(data: any) {
    this.clearToken();
    const auth = await this.$axios.post("/v1/auth/verify", data);
    this.setToken(auth.data.data.accessToken, auth.data.data.expiresIn);
    await this.setUser(auth.data.data.user);
    return auth.data;
  }

  async refreshToken() {
    const auth = await this.$axios.post("/v1/auth/refresh-token");
    this.setToken(auth.data.data.accessToken, auth.data.data.expiresIn);
    return auth.data;
  }

  async logout() {
    const auth = await this.$axios.post("/v1/auth/logout");
    await this.setUser(null);
    this.clearToken();
    return auth.data;
  }

  fetchUser() {
    const jwt =this.syncToken();
    if (!jwt) {
      return null;
    }

    return this.user;
  }

  async setUser(user: null) {
    this.user = user;
    await this.callHook("userUpdated", user);
  }

  browse(entity: any, params: any) {
    return this.$axios
      .get(`/${entity}`, { params })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  read(entity: any, params: any) {
    return this.$axios
      .get(`/${entity}/read`, { params })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  readBySlug(entity: any, params: any) {
    return this.$axios
      .get(`/${entity}/read-slug`, { params })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  readByPostSlug(entity: any, params: any) {
    return this.$axios
      .get(`/${entity}/post`, { params })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  author(entity: any, params: any) {
    return this.$axios
      .get(`/${entity}/author`, { params })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  add(entity: any, data: any) {
    return this.$axios
      .post(`/${entity}/add`, data)
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  fetch(entity: any, params: any) {
    return this.$axios
      .get(`/${entity}/fetch`, { params })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  fetchMultiple(entity: any, params: any) {
    return this.$axios
      .get(`/${entity}/fetch-multiple`, { params })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  edit(entity: any, data: any) {
    return this.$axios
      .put(`/${entity}/edit`, data)
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  delete(entity: any, data: any) {
    return this.$axios
      .delete(`/${entity}/delete`, { data })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  deleteMultiple(entity: any, data: any) {
    return this.$axios
      .delete(`/${entity}/delete-multiple`, { data })
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  sort(entity: any, data: any) {
    return this.$axios
      .put(`/${entity}/sort`, data)
      .then((res: { data: any; }) => res.data)
      .catch((err: any) => {
        throw err;
      });
  }

  getClientStorage() {
    const storageType =
      this.options.expires === "session" ? "sessionStorage" : "localStorage";

    if (process.client && typeof window[storageType] !== "undefined") {
      return window[storageType];
    }

    return null;
  }

  getToken() {
    let token: any;
    const clientStorage = this.getClientStorage();
    if (clientStorage) {
      const session = destr(clientStorage.getItem(this.options.key));
      if (session) {
        token = session.token;
      }
    }
    if (!token) {
      token = this.$cookies.get(this.options.key);
    }
    return token;
  }

  setToken(token?: any, expiresIn?: undefined) {
    const clientStorage = this.getClientStorage();
    clientStorage && clientStorage.setItem(this.options.key, token);
    this.$cookies.set(this.options.key, token, {
      maxAge: expiresIn,
    });
    this.$axios.setToken(token, "Bearer");
  }

  clearToken() {
    this.$axios.setToken(false, 0);
    const clientStorage = this.getClientStorage();
    clientStorage && clientStorage.removeItem(this.options.key);
    this.$cookies.remove(this.options.key);
  }

  syncToken(jwt?: string | undefined) {
    if (!jwt) {
      jwt = this.getToken();
    }

    if (jwt) {
      this.setToken(jwt);
    } else {
      this.clearToken();
    }
    return jwt;
  }
}
