# Express Super Router
 Simple file routing for express. Unlike other packages, Express Super Router uses express's own `Router()` function instead of a custom made one.

 ## Getting Started
 - [Usage](Usage)
 - [Installation](Installation)
 - [Examples](./examples/)
 - [Documentation](Documentation)

## Usage

```js
//	ES6 modules
import superrouter from 'express-super-router';
import express from 'express';

//	CommonJS
const superrouter = require('express-super-router');
const express = require('exress');

const app = express();
app.use(express.json());

//	Adding routes

app.use('/api', superrouter('./src/routes'));
//	all Router instances within 'src/routes' will now be added

app.listen(8080);
```

##	Installation

- yarn: `yarn add express-super-router`
- npm: `npm i express-super-router`

##	Documentation 

### Function `superrouter`
The main function for Express Super Router, this will pretty much be the only function you need.
```ts
superrouter(dir: string, options?: SuperRouteOptions): Express.Router
```
Example:
```ts
const express = require('express');
const superrouter = require('express-super-router');

express.use('/api', superrouter('src/routes'));
```

### Interface `SuperRouterOptions`
Simple interface for the options of the Express Super Router function
```ts
interface SuperRouterOptions {
	recursive?: boolean,
	ignorePrefix?: string
}
```

###	Route file
 Routes must have an export of `Express.Router()`

 example:
```js
/* src/routes/index.ts */
const { Router } = require('express');

const route = Router();

route.get('/', (_, res) => {
	res.send({ '' })
})

module.export = route;
```

###	Name refferences
 Express Super Router only changes the express name refferences slightly for params, instead of using `:id` you should use `[id]`

 examples:
 - `/index.js` => `/`
 - `/index/about.js` => `/index/about`
 - `/users/[id].js` => `/users/:id`
 - `/files/[user][repo]` => `/files/:user/:repo`
