<template>
  <div>
    <h1>@badaso/nuxt</h1>
    <h2>$badaso.state</h2>
    <pre>{{ JSON.stringify($badaso.state) }}</pre>
    <h2>options.url</h2>
    <pre>{{ $badaso.$http._defaults.prefixUrl }}</pre>

    <pre>{{ data }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: {}
    }
  },
  async fetch() {
    this.data = await this.$badaso.$content.fetch({
      slug: 'content'
    });
  },
}
</script>