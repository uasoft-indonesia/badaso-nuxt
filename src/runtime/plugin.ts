import { defineNuxtPlugin } from '#app'
import { reactive } from "vue";
import { Badaso } from './badaso';

const options = JSON.parse("<%= JSON.stringify(options) %>");

const post: string | boolean | null = options.entities.post ?? null;
const content: string | boolean | null = options.entities.content ?? null;
const crud: any = options.entities.crud ?? null;

if (post && typeof post === "boolean") {
  Object.defineProperty(Badaso.prototype, "$post", {
    get() {
      const that = this;
      return {
        browse(...args: any[]) {
          return that.browse("module/post/v1/post", ...args);
        },
        popular(...args: any[]) {
          return that.browse("module/post/v1/post/popular", ...args);
        },
        readBySlug(...args: any[]) {
          return that.readBySlug("module/post/v1/post", ...args);
        },
        author(...args: any[]) {
          return that.author("module/post/v1/post", ...args);
        },
      };
    },
  });

  Object.defineProperty(Badaso.prototype, "$category", {
    get() {
      const that = this;
      return {
        browse(...args: any[]) {
          return that.browse("module/post/v1/category", ...args);
        },
        read(...args: any[]) {
          return that.read("module/post/v1/category", ...args);
        },
        readBySlug(...args: any[]) {
          return that.readBySlug("module/post/v1/category", ...args);
        },
      };
    },
  });

  Object.defineProperty(Badaso.prototype, "$tag", {
    get() {
      const that = this;
      return {
        browse(...args: any[]) {
          return that.browse("module/post/v1/tag", ...args);
        },
        read(...args: any[]) {
          return that.read("module/post/v1/tag", ...args);
        },
        readBySlug(...args: any[]) {
          return that.readBySlug("module/post/v1/tag", ...args);
        },
      };
    },
  });

  Object.defineProperty(Badaso.prototype, "$comment", {
    get() {
      const that = this;
      return {
        readByPostSlug(...args: any[]) {
          return that.readByPostSlug("module/post/v1/comment", ...args);
        },
        add(...args: any[]) {
          return that.add("module/post/v1/comment", ...args);
        },
      };
    },
  });
}

if (content && typeof content === "boolean") {
  Object.defineProperty(Badaso.prototype, "$content", {
    get() {
      const that = this;
      return {
        fetch(...args: any[]) {
          return that.fetch("module/content/v1/content", ...args);
        },
        fetchMultiple(...args: any[]) {
          return that.fetchMultiple("module/content/v1/content", ...args);
        },
      };
    },
  });
}

if (crud && crud.length > 0) {
  crud.forEach((entity: string) => {
    const key = `$${entity}`;
    entity = `v1/entities/${entity}`;

    Object.defineProperty(Badaso.prototype, key, {
      get() {
        const that = this;
        return {
          browse(...args: any[]) {
            return that.browse(entity, ...args);
          },
          read(...args: any[]) {
            return that.read(entity, ...args);
          },
          add(...args: any[]) {
            return that.add(entity, ...args);
          },
          edit(...args: any[]) {
            return that.edit(entity, ...args);
          },
          delete(...args: any[]) {
            return that.delete(entity, ...args);
          },
          deleteMultiple(...args: any[]) {
            return that.deleteMultiple(entity, ...args);
          },
          sort(...args: any[]) {
            return that.sort(entity, ...args);
          },
        };
      },
    });
  });
}

export default defineNuxtPlugin(async (context: any) => {
  // console.log('Plugin injected by my-module!')
  const badaso = new Badaso(context, options);

  if (process.server && !process.static) {
    await badaso.fetchUser();

    context.beforeNuxtRender(({ nuxtState }: { nuxtState: any }) => {
      nuxtState.badaso = badaso.state;
    });
  }

  const { nuxtState = {} } = context || {};
  if (process.client && nuxtState.badaso) {
    badaso.state = reactive(nuxtState.badaso);
  }

  if (process.client && !nuxtState.badaso) {
    await badaso.fetchUser();
  }

  context.$badaso = badaso;
});
