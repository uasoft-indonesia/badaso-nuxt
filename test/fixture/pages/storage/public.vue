<template>
  <div>
    <h1>@badaso/nuxt</h1>
    <h2>options.url</h2>
    <pre>{{ $badaso.$axios.defaults.baseURL }}</pre>

    <h2>options.driver</h2>
    <pre>{{ $badaso.options.driver }}</pre>

    <h2>Test</h2>
    <h2>Loaded badaso.png: {{ badaso }}</h2>
    <div>
      <img :src="$badaso.$storage.get('files/shares/badaso.png')" @error="badaso = true">
    </div>

    <h2>Loaded favicon.png: {{ favicon }}</h2>
    <div>
      <img :src="$badaso.$storage.get('files/shares/favicon.png')" @error="favicon = true">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      badaso: false,
      favicon: false
    }
  },
}
</script>