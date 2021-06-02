## `$category`

You can access the category blog API operations by using these methods:
### `browse()`

Browse categories using this method. Example: 
```js
this.$badaso.$category.browse();
```

### `read({ id, except })`

Read a category based on their Id's. Example: 
```js
this.$badaso.$category.read({ id: '232a7419-a9b4-40d5-91c0-ccfb47882aaa' });
```

`id`: Category id.
- Type: `String` | `UUID`
- Required: Yes

`except`: Get categoies except the one that queried.
- Type: `Boolean`
- Required: No
- Default: No

### `readBySlug({ slug, except })`

Read a category based on their slug's. Example: 
```js
this.$badaso.$category.readBySlug({ slug: 'lorem-ipsum-dolor-sit-amet' });
```

`slug`: Category slug.
- Type: `String`
- Required: Yes

`except`: Get categoies except the one that queried.
- Type: `Boolean`
- Required: No
- Default: No