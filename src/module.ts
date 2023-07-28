import { defineNuxtModule, addPlugin, createResolver } from "@nuxt/kit";
import defu from "defu";
import { fileURLToPath } from "url";
// import { resolve } from "path";
import { name, version } from "../package.json";
import

// Module options TypeScript interface definition
export interface ModuleOptions {
  endpoint?: string;
  entities?: {
    crud: string[];
  };
  prefix?: string;
  key?: string;
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name,
    version,
  },
  setup(options, nuxt) {
    const defaults: ModuleOptions = {
      endpoint: process.env.BADASO_URL || "http://localhost:8000",
      entities: {
        crud: [],
      },
      prefix: "badaso-api",
      key: "token",
    };
    const { resolve } = createResolver(import.meta.url);

    const moduleOptions = defu(nuxt.options.badaso, defaults);

    nuxt.options.runtimeConfig.public = nuxt.options.runtimeConfig.public || {};
    nuxt.options.runtimeConfig.public.badaso = nuxt.options.runtimeConfig.public.badaso || {};
    nuxt.options.runtimeConfig.public.badaso.endpoint = moduleOptions.endpoint;
    nuxt.options.runtimeConfig.public.badaso.prefix = moduleOptions.prefix;

    const runtimeDir = fileURLToPath(new URL("./runtime/badaso", import.meta.url));
    nuxt.options.build.transpile.push(
      runtimeDir,
      "destr",
      "requrl",
      "hookable",
      "ufo"
    );

    // const plugin = resolve("./runtime/plugin");
    // nuxt.options.build.transpile.push(plugin);
    // addPlugin(plugin);
    // addPlugin(resolver.resolve("./runtime/plugin"));
// nuxt.requireModule('cookie-universal-nuxt')
    // nuxt.hook("close", async () => {});
  },
});
