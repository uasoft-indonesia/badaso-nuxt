<template>
  <div>
    <h1>@badaso/nuxt</h1>
    <h2>$badaso.state</h2>
    <pre>{{ $badaso.state }}</pre>
    <h2>options.url</h2>
    <pre>{{ $badaso.$axios.defaults.baseURL }}</pre>

    <h2>Testing</h2>
    <pre>Post-Browse: {{ postBrowse }}</pre>
    <pre>Post-Popular: {{ postPopular }}</pre>
    <pre>Post-ReadBySlug: {{ postReadBySlug }}</pre>

    <pre>Category-Browse: {{ categoryBrowse }}</pre>
    <pre>Category-Read: {{ categoryRead }}</pre>
    <pre>Category-ReadBySlug: {{ categoryReadBySlug }}</pre>

    <pre>Tag-Browse: {{ tagBrowse }}</pre>
    <pre>Tag-Read: {{ tagRead }}</pre>
    <pre>Tag-ReadBySlug: {{ tagReadBySlug }}</pre>

    <pre>Comment-ReadByPostSlug: {{ commentReadByPostSlug }}</pre>
    <pre>Comment-Add: {{ commentAdd }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      postSlug: '',
      postId: '',
      postBrowse: false,
      postPopular: false,
      postReadBySlug: false,

      categoryId: '',
      categorySlug: '',
      categoryBrowse: false,
      categoryRead: false,
      categoryReadBySlug: false,

      tagId: '',
      tagSlug: '',
      tagBrowse: false,
      tagRead: false,
      tagReadBySlug: false,

      commentReadByPostSlug: false,
      commentAdd: false,

      login: false
    }
  },
  async fetch() {
    // POST
    let post = await this.$badaso.$post.browse()

    if (post) {
      this.postBrowse = true
      this.postSlug = post.data.posts.data[0].slug
      this.postId = post.data.posts.data[0].id
      let postRead = await this.$badaso.$post.readBySlug({ slug: this.postSlug })

      if (postRead) {
        this.postReadBySlug = true
      }

      // COMMENT
      let command = await this.$badaso.$comment.readByPostSlug({ slug: this.postSlug, page: 1 })

      if (command) {
        this.commentReadByPostSlug = true
      }

      let login = await this.$badaso.login({
        email: 'admin@gmail.com',
        password: 'admin'
      })

      if (login) {
        this.login = true
      }

      if (login) {
        let commentAdd = await this.$badaso.$comment.add({ postId: this.postId, content: "Hello World!" });

        if (commentAdd) {
          this.commentAdd = true
        }
      }
    }

    let postPopular = await this.$badaso.$post.popular()

    if (postPopular) {
      this.postPopular = true
    }

    // CATEGORY
    let category = await this.$badaso.$category.browse()

    if (category) {
      this.categoryBrowse = true
      this.categoryId = category.data.categories[0].id
      this.categorySlug = category.data.categories[0].slug

      let categoryReadSlug = await this.$badaso.$category.readBySlug({ slug: this.categorySlug })

      if (categoryReadSlug) {
        this.categoryReadBySlug = true
      }

      let categoryRead = await this.$badaso.$category.read({ id: this.categoryId })

      if (categoryRead) {
        this.categoryRead = true
      }
    }

    // TAG
    let tag = await this.$badaso.$tag.browse()

    if (tag) {
      this.tagBrowse = true
      this.tagId = tag.data.tags[0].id
      this.tagSlug = tag.data.tags[0].slug

      let tagReadBySlug = await this.$badaso.$tag.readBySlug({ slug: this.tagSlug })

      if (tagReadBySlug) {
         this.tagReadBySlug = true
      }

      let tagRead = await this.$badaso.$tag.read({ id: this.tagId })

      if (tagRead) {
        this.tagRead = true
      }
    }
  },
}
</script>