<template>
  <div>
    <h1>@badaso/nuxt</h1>
    <h2>$badaso.state</h2>
    <pre>{{ $badaso.state }}</pre>
    <h2>options.url</h2>
    <pre>{{ $badaso.$axios.defaults.baseURL }}</pre>

    <h2>Email</h2>
    <pre>{{ email }}</pre>

    <h2>Test</h2>
    <pre>Login: {{ login.message }}</pre>

    <pre>Browse: {{ browse.message }}</pre>

    <pre>Read: {{ read.message }}</pre>

    <pre>Add: {{ add.message }}</pre>

    <pre>Edit: {{ edit.message }}</pre>

    <pre>Delete: {{ deletes.message }}</pre>

    <pre>Delete Multiple: {{ deleteMultiple.message }}</pre>

    <pre>Sort: {{ sort.message }}</pre>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {message: ""},
      email: 'admin@gmail.com',
      browse: {message: ""},
      read: {message: ""},
      add: {message: ""},
      edit: {message: ""},
      deletes: {message: ""},
      deleteMultiple: {message: ""},
      sort: {message: ""}
    }
  },
  async fetch() {
    this.login = await this.$badaso.login({
      email: this.email,
      password: 'admin'
    })

    this.browse = await this.$badaso['$api-docs'].browse()
    this.read = await this.$badaso['$api-docs'].read({
      id: this.browse.data.entities.data[0].id
    })
    this.add = await this.$badaso['$api-docs'].add({
      "slug": "api-docs",
      "data": [
        {
          "field": "name",
          "value": "Abc"
        },
        {
          "field": "amount",
          "value": "123"
        }
      ]
    })
    this.edit = await this.$badaso['$api-docs'].edit({
      "slug": "api-docs",
      "data": [
        {
          "field": "id",
          "value": this.add.data.entities.id
        },
        {
          "field": "name",
          "value": "Cba"
        },
        {
          "field": "amount",
          "value": "321"
        }
      ]
    })
    this.deletes = await this.$badaso['$api-docs'].delete({
      "slug": "api-docs",
      "data": [
        {
          "field": "id",
          "value": this.add.data.entities.id
        }
      ]
    })
    var tempOne = await this.$badaso['$api-docs'].add({ "slug": "api-docs", "data": [ { "field": "name", "value": "Abc" }, { "field": "amount", "value": "123" } ] })
    var tempTwo = await this.$badaso['$api-docs'].add({ "slug": "api-docs", "data": [ { "field": "name", "value": "Abc" }, { "field": "amount", "value": "123" } ] })
    this.deleteMultiple = await this.$badaso['$api-docs'].deleteMultiple({
      "slug": "api-docs",
      "data": [
        {
          "field": "ids",
          "value": `${tempOne.data.entities.id},${tempTwo.data.entities.id}`
        }
      ]
    })
    this.sort = await this.$badaso['$api-docs'].sort({
      "slug": "api-docs",
      "data": [
        {
          "id": "9",
          "name": "32133",
          "amount": "32133",
        },
        {
          "id": "8",
          "name": "123",
          "amount": "123",
        },
      ]
    })
  },
}
</script>