# SPA Server

This package wraps a [fastify][fastify] server for use with serving Single Page Apps (SPAs) such as React applications
built with Webpack.

This is an incredibly lightweight library with minimal features, although this may grow over time.

- Serves static assets from a directory
- Injects configuration into the `index.html` body which can be consumed client-side. This is useful when you want
  environment variables to be defined at runtime rather than build-time via Webpack.
- Fallback all 404 requests to the index.html, supporting client-side routing solutions such as react-router.

## Getting Started

Install the package:

```sh
npm install --save @versori/spa-server
```

Create your own `server/server.js` which will be the entrypoint into your server-side application. If using a bundler,
ensure this file is not included in your client-side bundle.

```js
import { serve } from '@versori/spa-server/server';
import * as path from 'path';

serve(path.resolve(__dirname, '../dist'), {
    foo: process.env.FOO,
});
```

Ensure the config is loaded on the client, this should be called as early as possible, preferably before rendering your
application to the DOM:

```js
import { loadConfig, ValidateError } from '@versori/spa-server/client';

loadConfig(defaultConfig)
    .then(() => {
        // ...
        // const root = ReactDOM.createRoot(document.getElementById('root'));
        // root.render(<YourApp />);
    })
    .catch((err) => {
        console.error('loadConfig() failed', err instanceof ValidateError ? err.messages : err.message);
        throw err;
    });
```

> Note: It's up to the user whether the application should wait for the promise returned by `loadConfig()` to be
> resolved before rendering or not, and what should happen if an error is thrown.

Then to access your config elsewhere in your application:

```js
import { getConfig } from '@versori/spa-server/client';

const config = getConfig();

// ...
```

### TypeScript support

TypeScript support is included in this package, just rename your `server.js` file to `server.ts` and configure your
workspace to compile the file, or use `ts-node` for execution.

By default, the `config` object set via `loadConfig()` and retrieved using `getConfig()` is typed to an empty interface:

```ts
export interface RuntimeConfig {
}
```

Users should add a `.d.ts` file in your project containing a declaration of the `RuntimeConfig` interface which should
be merged with the empty interface defined by this package; this technique is called 
[declaration merging][declaration merging].

```ts
// filename: runtime-config.d.ts
import '@versori/spa-server/client';

declare module '@versori/spa-server/client' {
    interface RuntimeConfig {
        foo: string;
    }
}
```

[fastify]: https://www.fastify.io

[declaration merging]: https://www.typescriptlang.org/docs/handbook/declaration-merging.html
