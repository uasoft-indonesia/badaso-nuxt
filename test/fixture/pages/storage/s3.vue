<template>
  <div>
    <h1>@badaso/nuxt</h1>
    <h2>options.url</h2>
    <pre>{{ $badaso.$axios.defaults.baseURL }}</pre>

    <h2>options.driver</h2>
    <pre>{{ $badaso.options.driver }}</pre>

    <h2>Test</h2>
    <h2>Loaded capture.png: {{ capture }}</h2>
    <div>
      <img :src="$badaso.$storage.get('files/shares/Capture.PNG')" @error="capture = true">
    </div>

    <h2>Loaded chart.png: {{ chart }}</h2>
    <div>
      <img :src="$badaso.$storage.get('files/shares/chart.jpg')" @error="chart = true">
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      capture: false,
      chart: false
    }
  },
}
</script>