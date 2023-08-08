import { defineNuxtModule, addPluginTemplate,addPlugin, createResolver } from "@nuxt/kit";
import defu from "defu";
import { fileURLToPath } from "url";
import { resolve } from "path";
import { name, version } from "../package.json";
import { NuxtModule } from "@nuxt/schema";

// Module options TypeScript interface definition
export interface ModuleOptions {
  endpoint?: string;
  entities?: {
    crud: string[];
  };
  prefix?: string;
  key?: string;
}

export const badasoModule: NuxtModule<ModuleOptions> = defineNuxtModule({
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
    nuxt.options.runtimeConfig.public.badaso =
    nuxt.options.runtimeConfig.public.badaso || {};
    nuxt.options.runtimeConfig.public.badaso.endpoint = moduleOptions.endpoint;
    nuxt.options.runtimeConfig.public.badaso.prefix = moduleOptions.prefix;

    const runtimeDir = fileURLToPath(new URL("./runtime", import.meta.url));
    nuxt.options.alias["~badaso"] = runtimeDir;
    nuxt.options.build.transpile.push(
      runtimeDir,
      "destr",
      "requrl",
      "hookable",
      "ufo"
    );

    const plugin = resolve("./runtime/plugin.ts");
    nuxt.options.build.transpile.push(plugin);
    //  addPlugin(plugin);
    addPlugin({
      src: plugin,
      fileName: "badaso.ts",
      options: moduleOptions,
    });

    //  nuxt.require("cookie-universal-nuxt");
    nuxt.hook("close", async () => {});
  },
});

export default badasoModule;
