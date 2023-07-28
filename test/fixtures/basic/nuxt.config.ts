import MyModule from '../../../src/module'
import { defineNuxtConfig } from "@nuxt/bridge";


export default defineNuxtConfig({
  modules: [MyModule],
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
});
