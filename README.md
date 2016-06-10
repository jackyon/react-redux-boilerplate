<h1>react-redux-boilerplate</h1>
> Containing modern web development tools such as Webpack, React Hot Loader, React Router, Dynamic routing, Redux, Redux simple router, esLint, Babel6, sass, less, postcss, BrowserSync, Tinypng...

Directory Layout:
```
├── /app/                       # The source code of the application
│   ├── /actions/            	# Redux action creators
│   ├── /components/            # Generic React Components (generally Dumb components)
│   ├── /constants/            	# Constants (action types etc.)
│   ├── /containers/            # Components that provide context (e.g. Redux Provider)
│   ├── /public/            	# Static files which are copied into the /dist/ root folder
│   ├── /reducers/            	# Redux reducers
│   ├── /routes/            	# Application route definitions
│   ├── /store/            	    # Redux store configuration
│   ├── /tmpl/               	# Static content (plain HTML or Markdown)
│   ├── /utils/            		# Generic utilities
│   ├── history.js              # history configuration
│   ├── index.js            	# Application bootstrap and rendering
│
├── /build/                     # The folder for compiled output
├── /dist/                      # The folder for deploy output
├── /node_modules/              # 3rd-party libraries and utilities
├── .babelrc                    # configuration file for babel
├── .editorconfig               # Configures editor rules
├── .eslintrc                   # Configures ESLint
├── .eslintignore               # ingore folders/files while using ESLint
├── stats.json                  # Analyzing build statistics
├── webpack.config.js           # configuration file for webpack
├── package.json                # The list of 3rd party libraries and utilities
```

<h2>Packages Install</h2>
```
$ npm install
```

<h2>Usage</h2>

Dev:
```
$ npm run dev
```
Browser sync:
```
$ npm run browsersync
```
esLint:
```
$ npm run lint
```
stats:
```
$ npm run stats (after executed, upload 'stats.json' file to http://webpack.github.io/analyse/)
```
Deploy:
```
$ npm run deploy
```

Image compress:<br>
<h5>PNG:</h5>
```
$ npm install tinypng-tool
$ tinypng -k I_KC7xGPxXfZPrEbrc-kXWBetAQ323rz (change to your own api.)
$ npm run tinypng
```
> hint: png compress is using tinypng service, make sure you change the above api to your owns.
>
> Get api: https://tinypng.com/developers (free 500 images/month. )
>
> after you get the api, run:
> $ tinypng -k I_KC7xGPxXfZPrEbrc-kXWBetAQ323rz
>
> tips: you can also copy "npm run tinypng;" inside to your package deploy commond, so you no need to run compress commond every time after you deploy

<h5>JPEG:</h5>
```
fot now, I'm still using jpegmini, this is the best tools to compress the jpeg images that I discovered so far.
even though the jpegmini app is so simple to use it(just simple drag&drop), but I will consider to integrate this super tool into webpack. Still researching...
```


<h2>Hints:</h2>
why not using webpack imagein plugin, cause that plugin doesn't save so much sizes. if you have better solution plz contact me.

By default "npm run tinypng" will replace the original png files, there more usage:
```
tinypng [options] [image.png|*.png]
  -k, --api-key       Set default TinyPNG API key.
  -r, --allow-rewrite Rewrite the original files with compressed data.
  -n, --allow-nonpng  Allow you to compress files without .png extention.
  -p, --postfix       Postfix for compressed files when rewriting disabled.
  -h, --help          This message.
  -v, --version       Show version.
```
you can custom the scripts in package.json file.



<h2>The issues you might be focued.</h2>
<h3>300ms tap delay</h3>
iOS's dreaded 300ms tap delay. React's onClick attribute falls prey to it. Facebook's working on a solution in the form of TapEventPlugin, but it won't be made available until 1.0.

see more from here:
https://github.com/zilverline/react-tap-event-plugin

- another solution: react fastclick

<h3>Babel polyfill</h3>
the Babel polyfill wasn't included in the framework by default, feel free to follow this the article below if you want to use it.
http://jamesknelson.com/using-es6-in-the-browser-with-babel-6-and-webpack/?utm_source=jsgroup

<h3>errors when run 'npm run deploy'</h3>
In ubuntu system, when you try npm run deploy, it might be cause the errors, if you againest with this, try remove the FaviconsWebpackPlugin configs on webpack.config.js.



<h2>Advanced Performance</h2>
<h3>Immutablejs</h3>
Immutability makes tracking changes cheap; a change will always result in a new object so we only need to check if the reference to the object has changed. More: https://facebook.github.io/immutable-js/

how to use with react/redux/redux logger:

- using with react-router-redux:
https://github.com/gajus/redux-immutable

- Redux logger middleware: Transform Immutable objects into JSON
(example file from "store/configureStore.js")
```javascript
import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers/'
import Immutable from 'immutable'

let finalCreateStore
let middleware = [thunk]

if (__DEV__) {
    const logger = require('redux-logger')

    // Transform Immutable objects into JSON
    const stateTransformer = (state) => {
        const newState = {};
        for (let i of Object.keys(state)) {
            if (Immutable.Iterable.isIterable(state[i])) {
                newState[i] = state[i].toJS();
            } else {
                newState[i] = state[i];
            }
        }
        return newState;
    };

    finalCreateStore = compose(
        applyMiddleware(...middleware),
        applyMiddleware(logger({
            collapsed: true,
            stateTransformer
        }))
    )(createStore)
} else {
    finalCreateStore = applyMiddleware(...middleware)(createStore)
}

export default function configureStore(initialState) {
    const store = finalCreateStore(rootReducer, initialState)
    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('../reducers/', () => {
            const nextReducer = require('../reducers/')
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
```
