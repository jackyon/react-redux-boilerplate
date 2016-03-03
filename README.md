<h1>react-redux-boilerplate</h1>
> Containing modern web development tools such as Webpack, React Hot Loader, React Router, Dynamic routing, Redux, Redux simple router, Babel, sass, autoprefixer, BrowserSync, Tinypng...

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
│   ├── index.js            	# Application bootstrap and rendering
│
├── /build/                     # The folder for compiled output
├── /dist/                      # The folder for deploy output
├── /node_modules/              # 3rd-party libraries and utilities
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
Deploy:
```
$ npm run deploy
```
Image compress:<br>
<h5>PNG:</h5>
```
$ npm install tinypng-tool
$ tinypng -k I_KC7xGPxXfZPrEbrc-kXWBetAQ323rz(change to your own api.)
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
<h3>Scrolling</h3>
react router have scroll behaviors issues, i.e:
getting scroll position to reset to the top of a page on navigation

you can see the solution from here: 
https://github.com/rackt/react-router/blob/73e6c85f427c48f90bae0bb0e9745b6b48536e2f/CHANGES.md#scrolling

<h3>300ms tap delay</h3>
iOS's dreaded 300ms tap delay. React's onClick attribute falls prey to it. Facebook's working on a solution in the form of TapEventPlugin, but it won't be made available until 1.0.

see more from here:
https://github.com/zilverline/react-tap-event-plugin



<h2>Advanced Performance</h2>
<h3>Immutablejs</h3>
Immutability makes tracking changes cheap; a change will always result in a new object so we only need to check if the reference to the object has changed. More: https://facebook.github.io/immutable-js/

how to use with react/redux/redux logger:

- using with react-router-redux:
https://github.com/gajus/redux-immutable

- Redux logger middleware: Transform Immutable objects into JSON
```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers';
import createLogger from 'redux-logger';
import Immutable from 'immutable';

const logger = createLogger({
	// Transform Immutable objects into JSON
	stateTransformer: (state) => {
		const newState = {};
		
		for (let i of Object.keys(state)) {
			if (Immutable.Iterable.isIterable(state[i])) {
				newState[i] = state[i].toJS();
			} else {
				newState[i] = state[i];
			}
		}
		return newState;
	}
});

const createStoreWithMiddleware = applyMiddleware(
  thunk, logger
)(createStore);

export default function configureStore(initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
```