# React Konami Code Changelog

### 2.2.0
- Migrated library to TS: full TS support.
- Added optimization using `shouldComponentUpdate`. Avoids rerenders for every timer interval and input.


### 2.1.1
Updated package description and improved documentation.

### 2.1.0
Readded `useKonami` hook.

### 2.0.0-beta.1
Removed usage of `useKonami` custom hook until it's ready to be used.

### 2.0.0-beta.0
Add `useKonami` custom hook.

### v1.4.3
Add missing `onTimeout` to type definitions.

### v1.4.2
Unlisten `keyup` event on `componentWillUnmount`.

### v1.4.0
Fixes the following warning by properly clearing the timeout on `componentWillUnmount`:

```
Warning: Can't perform a React state update on an unmounted component. This is a no-op, but it indicates a memory leak in your application. To fix, cancel all subscriptions and asynchronous tasks in the componentWillUnmount method.
```

### v1.3.0
Adds typescript support.

### v1.2.3
Fixes third party vulnerabilities. v1.2.2 introduced an error with the dist file.

~~v1.2.2
Fixes third party vulnerabilities.~~

### v1.2.0
Adds testing and coverage support.

### v1.1.3
Updated package.json keywords for better searching.

### v1.1.2
Updated README with badges.

### v1.1.1
Initial release.

<small>Since this is my first npm package I had some issues with versioning, but updates will be pushed from this release as usual.</small>