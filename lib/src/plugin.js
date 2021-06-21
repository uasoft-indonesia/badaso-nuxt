import Vue from 'vue'
import { Badaso } from '~badaso'

const options = JSON.parse('<%= JSON.stringify(options) %>')

const blog = options.entities.blog ?? null
const content = options.entities.content ?? null
const crud = options.entities.crud ?? null

Object.defineProperty(Badaso.prototype, '$storage', {
  get () {
    const that = this
    return ({
      get (path) {
        return that.getStoragePath(path)
      }
    })
  }
})

if (blog && typeof blog === 'boolean') {
  Object.defineProperty(Badaso.prototype, '$post', {
    get () {
      const that = this
      return ({
        browse (...args) {
          return that.browse('module/blog/v1/post', ...args)
        },
        popular (...args) {
          return that.browse('module/blog/v1/post/popular', ...args)
        },
        readBySlug (...args) {
          return that.readBySlug('module/blog/v1/post', ...args)
        }
      })
    }
  })

  Object.defineProperty(Badaso.prototype, '$category', {
    get () {
      const that = this
      return ({
        browse (...args) {
          return that.browse('module/blog/v1/category', ...args)
        },
        read (...args) {
          return that.read('module/blog/v1/category', ...args)
        },
        readBySlug (...args) {
          return that.readBySlug('module/blog/v1/category', ...args)
        }
      })
    }
  })

  Object.defineProperty(Badaso.prototype, '$tag', {
    get () {
      const that = this
      return ({
        browse (...args) {
          return that.browse('module/blog/v1/tag', ...args)
        },
        read (...args) {
          return that.read('module/blog/v1/tag', ...args)
        },
        readBySlug (...args) {
          return that.readBySlug('module/blog/v1/tag', ...args)
        }
      })
    }
  })

  Object.defineProperty(Badaso.prototype, '$comment', {
    get () {
      const that = this
      return ({
        readByPostSlug (...args) {
          return that.readByPostSlug('module/blog/v1/comment', ...args)
        },
        add (...args) {
          return that.add('module/blog/v1/comment', ...args)
        }
      })
    }
  })
}

if (content && typeof content === 'boolean') {
  Object.defineProperty(Badaso.prototype, '$content', {
    get () {
      const that = this
      return ({
        fetch (...args) {
          return that.fetch('v1/module/content', ...args)
        },
        fetchMultiple (...args) {
          return that.fetchMultiple('v1/module/content', ...args)
        }
      })
    }
  })
}

if (crud && crud.length > 0) {
  crud.forEach((entity) => {
    const key = `$${entity}`
    entity = `v1/entities/${entity}`

    Object.defineProperty(Badaso.prototype, key, {
      get () {
        const that = this
        return ({
          browse (...args) {
            return that.browse(entity, ...args)
          },
          read (...args) {
            return that.read(entity, ...args)
          },
          add (...args) {
            return that.add(entity, ...args)
          },
          edit (...args) {
            return that.edit(entity, ...args)
          },
          delete (...args) {
            return that.delete(entity, ...args)
          },
          deleteMultiple (...args) {
            return that.deleteMultiple(entity, ...args)
          },
          sort (...args) {
            return that.sort(entity, ...args)
          }
        })
      }
    })
  })
}

export default async function (context, inject) {
  const badaso = new Badaso(context, options)

  if (process.server && !process.static) {
    await badaso.fetchUser()

    context.beforeNuxtRender(({ nuxtState }) => {
      nuxtState.badaso = badaso.state
    })
  }

  const { nuxtState = {} } = context || {}
  if (process.client && nuxtState.badaso) {
    badaso.state = Vue.observable(nuxtState.badaso)
  }

  if (process.client && !nuxtState.badaso) {
    await badaso.fetchUser()
  }

  inject('badaso', badaso)
  context.$badaso = badaso
}
