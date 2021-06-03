## `$content`

You can access the content module API operations by using these methods:
### `fetch({ slug })`

Fetch a content using this method. Example: 
```js
this.$badaso.$content.fetch({ slug: 'article' });
```

`slug`: Content module slug.
- Type: `String`
- Required: Yes

### `fetchMultiple({ slug })`

Fetch multiple content at once using this method. Example: 
```js
this.$badaso.$content.fetchMultiple({ slug: 'navbar,footer,body' });
```

`slug`: Content module slugs (with comma delimiter).
- Type: `String`
- Required: Yes
