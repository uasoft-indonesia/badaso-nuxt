## CRUD Generated

Before you can access the CRUD generated API, you must define it on `nuxt.config.js`. For example:
```js
export default {
  badaso: {
    crud: ['products']
  }
}
```
You can access the CRUD generated API operations by using these methods:
### `browse()`

Browse CRUD generated rows using this method. Example: 
```js
this.$badaso.$products.browse();
```

For more examples, please refer to API Documentation on badaso.

### `read({ id })`

Read CRUD generated row using this method. Example: 
```js
this.$badaso.$products.read({
  id: 1
})
```

`id`: CRUD generated id.
- Type: `String | Number`
- Required: Yes

For more examples, please refer to API Documentation on badaso.

### `add({ slug, data })`

Insert new CRUD generated row using this method. Example: 
```js
this.$badaso.$products.add({
  slug: "products",
  data: [
    {
      field: "name",
      value: "Abc"
    },
    {
      field: "amount",
      value: "123"
    }
  ]
})
```

`slug`: CRUD generated slug.
- Type: `String`
- Required: Yes

`data`: CRUD generated slug.
- Type: `Array`
- Required: Yes

For more examples, please refer to API Documentation on badaso.

### `edit({ slug, data })`

Edit existing CRUD generated row using this method. Example: 
```js
this.$badaso.$products.edit({
  slug: "products",
  data: [
    {
      field: "id",
      value: 1
    },
    {
      field: "name",
      value: "Abc"
    },
    {
      field: "amount",
      value: "123"
    }
  ]
})
```

`slug`: CRUD generated slug.
- Type: `String`
- Required: Yes

`data`: CRUD generated slug.
- Type: `Array`
- Required: Yes

For more examples, please refer to API Documentation on badaso.

### `delete({ slug, data })`

Delete existing CRUD generated row using this method. Example: 
```js
this.$badaso.$products.delete({
  slug: "products",
  data: [
    {
      field: "id",
      value: 1
    },
  ]
})
```

`slug`: CRUD generated slug.
- Type: `String`
- Required: Yes

`data`: CRUD generated slug.
- Type: `Array`
- Required: Yes

For more examples, please refer to API Documentation on badaso.

### `deleteMultiple({ slug, data })`

Delete multiple existing CRUD generated rows using this method. Example: 
```js
this.$badaso.$products.deleteMultiple({
  slug: "products",
  data: [
    {
      field: "ids",
      value: "1,2,49"
    },
  ]
})
```

`slug`: CRUD generated slug.
- Type: `String`
- Required: Yes

`data`: CRUD generated slug.
- Type: `Array`
- Required: Yes

For more examples, please refer to API Documentation on badaso.

### `sort({ slug, data })`

Sort existing rows using this method. Example: 
```js
this.$badaso.$products.sort({
  slug: "products",
  data: [
    {
      id: "9",
      name: "32133",
      amount: "32133",
    },
    {
      "id": "8",
      name: "123",
      amount: "123",
    },
  ]
})
```

`slug`: CRUD generated slug.
- Type: `String`
- Required: Yes

`data`: CRUD generated slug.
- Type: `Array`
- Required: Yes

For more examples, please refer to API Documentation on badaso.
