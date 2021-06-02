## `$post`

You can access the post blog API operations by using these methods:
### `browse({ order_field, order_direction, category, tag, page, limit, search })`

Browse posts using this method. Example: 
```js
this.$badaso.$post.browse({ page: 1, limit: 10 });
```

`order_field`: Set order of posts based on selected field.
  - Type: `String`
  - Required: No
  - Default: `updated_at`
  
`order_direction`: Set order direction of posts.
- Type: `Enum` | `asc` or `desc`
- Required: No
- Default: `desc`

`category`: Filter the posts based on category.
- Type: `String`
- Required: No

`tag`: Filter the posts based on tag.
- Type: `String`
- Required: No
 
`page`: Pagination current page.
- Type: `Number` | `Int`
- Required: No
- Default: 1

`limit`: Pagination limit.
- Type: `Number` | `Int`
- Required: No
- Default: 10

`search`: Search the post based on this parameter.
- Type: `String`
- Required: No

### `popular({ page, limit })`

Browse popular posts using this method. Example: 
```js
this.$badaso.$post.popular({ page: 3, limit: 10 });
```

`page`: Pagination current page.
- Type: `Number` | `Int`
- Required: No
- Default: 1

`limit`: Pagination limit.
- Type: `Number` | `Int`
- Required: No
- Default: 10

### `readBySlug({ slug })`

Read a post using post slug. Example: 
```js
this.$badaso.$post.readBySlug({ slug: 'lorem-ipsum-dolor-sit-amet' });
```

`slug`: Post slug.
- Type: `String`
- Required: Yes