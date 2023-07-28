import { BadasoConfig } from "../customConfig";
import { defineNuxtConfig } from "@nuxt/bridge";

// const badasoConfig: BadasoConfig = {
//   endpoint: "http://localhost:8000",
//   entities: { post: true, content: true },
//   prefix: process.env.BACKEND_API_PREFIX,
// };

export default defineNuxtConfig({
  modules: ["../src/module"],
  myModule: {},
  devtools: { enabled: true },
  badaso: {
    endpoint: "http://localhost:8000",
    prefix: "api",
    key: "token",
    entities: {
      post: true,
      content: true,
      crud: ["api-docs"],
    },
  },
  runtimeConfig: {
    // Private config that is only available on the server
    private: {
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_VIEW,
      },
      axios: {
        baseURL: [
          process.env.BACKEND_BASE_URL,
          process.env.BACKEND_API_PREFIX,
        ].join("/"),
        proxy: false,
      },
      badaso: {
        endpoint: "http://localhost:8000",
        prefix: "api",
        key: "token",
        entities: {
          post: true,
          content: true,
          crud: ["api-docs"],
        },
      },
    },
    // Config within public will be also exposed to the client
    public: {
      googleAnalytics: {
        id: process.env.GOOGLE_ANALYTICS_VIEW,
      },
      axios: {
        baseURL: [
          process.env.BACKEND_BASE_URL,
          process.env.BACKEND_API_PREFIX,
        ].join("/"),
        proxy: false,
      },
      badaso: {
        endpoint: "http://localhost:8000",
        prefix: "api",
        key: "token",
        entities: {
          post: true,
          content: true,
          crud: ["api-docs"],
        },
      },
    },
  },
  axios: {
    baseURL: [
      process.env.BACKEND_BASE_URL,
      process.env.BACKEND_API_PREFIX,
    ].join("/"),
    proxy: false,
  },

  googleAnalytics: {
    id: process.env.GOOGLE_ANALYTICS_VIEW,
  },
  ssr: true,
  target: "server",
});
