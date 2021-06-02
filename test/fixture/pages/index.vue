<template>
  <div>
    <h1>@badaso/nuxt</h1>
    <h2>$badaso.state</h2>
    <pre>{{ JSON.stringify($badaso.state) }}</pre>
    <h2>options.url</h2>
    <pre>{{ $badaso.$http._defaults.prefixUrl }}</pre>

    <pre>{{ posts }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      posts: {}
    }
  },
  async fetch() {
    this.posts = await this.$badaso.$category.browse({
      slug: 'terapkan-sgds-perusahaan-otomotif-hemat-biaya-produksi-70',
      page: 1
    });
  },
}
</script>