import { Badaso } from '~badaso'

const options = JSON.parse('<%= JSON.stringify(options) %>')

Object.defineProperty(Badaso.prototype, '$post', {
  get () {
    const that = this
    return ({
      browse (...args) {
        return that.browse('module/blog/v1/post', ...args)
      },
      popular (...args) {
        return that.popular('module/blog/v1/post', ...args)
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

Object.defineProperty(Badaso.prototype, '$comment', {
  get () {
    const that = this
    return ({
      readByPostSlug (...args) {
        return that.readByPostSlug('module/blog/v1/comment', ...args)
      },
      add (...args) {
        return that.read('module/blog/v1/comment', ...args)
      }
    })
  }
})

export default function (ctx, inject) {
  const badaso = new Badaso(ctx, options)

  inject('badaso', badaso)
  ctx.$badaso = badaso
}
