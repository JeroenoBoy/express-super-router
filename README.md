# RouteFlow
 Simple file routing for express. Unlike other packages, RouteFlow uses express's own `Router()` function instead of a custom made one.

 ## Getting Started
 - [Usage](Usage)
 - [Installation](Installation)
 - [Examples](./examples/)
 - [Documentation](Documentation)

## Usage

```js
//	ES6 modules
import routeflow from 'routeflow';
import express from 'express';

//	CommonJS
const routeflow = require('routeflow');
const express = require('exress');

const app = express();
app.use(express.json());

//	Adding routes

app.use('/api', routeflow('./src/routes'));
//	all Router instances within 'src/routes' will now be added

app.listen(8080);
```

##	Installation

- yarn: `yarn add routeflow`
- npm: `npm i routeflow`

##	Documentation 

### Function `routeflow`
The main function for Routeflow, this will pretty much be the only function you need.
```ts
routeflow(dir: string, options?: RouteflowOptions): Express.Router
```
Example:
```ts
const express = require('express');
const routeflow = require('routeflow');

express.use('/api', routeflow('src/routes'));
```

### Interface `RouteflowOptions`
Simple interface for the options of the routeflow function
```ts
interface RouteflowOptions {
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
 routeflow only changes the express name refferences slightly for params, instead of using `:id` you should use `[id]`

 examples:
 - `/index.js` => `/`
 - `/index/about.ts` => `/index/about`
 - `/` => `/`
 - `/` => `/`
