## `$comment`

You can access the comment blog API operations by using these methods:
### `readByPostSlug({ slug, page, perPage, sort })`

Read comment by post slug using this method. Example: 
```js
this.$badaso.$comment.readByPostSlug({ slug: 'lorem-ipsum-dolor-sit-amet', page: 1, perPage: 10 });
```

`slug`: Post slug.
- Type: `String`
- Required: Yes
 
`page`: Pagination current page.
- Type: `Number` | `Int`
- Required: Yes
- Default: 1

`perPage`: Pagination limit.
- Type: `Number` | `Int`
- Required: No
- Default: 10

`sort`: Set order direction of comments.
- Type: `Enum` | `asc` or `desc`
- Required: No
- Default: `desc`

### `add({ postId, parentId, content })`

Add comment to the post (must login). Example: 
```js
this.$badaso.$comment.add({ postId: '232a7419-a9b4-40d5-91c0-ccfb47882aaa', content: "Hello World!" });
```

`postId`: Post id.
- Type: `String` | `UUID`
- Required: Yes

`parentId`: Parent post id.
- Type: `String` | `UUID`
- Required: No

`content`: Comment content.
- Type: `String`
- Required: Yes
