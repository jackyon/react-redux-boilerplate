var path = require('path');
var webpack = require('webpack');


/* =============================================================
 *  config for path
 * ============================================================ */
var node_modules_dir = path.join(__dirname, 'node_modules');
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');

/* =============================================================
 *  plugins settings
 * ============================================================ */
/* minimize js,css,img... */
var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
		minimize: true,
        output: {
            comments: false
        },
		compress: {
	        warnings: false,
            screw_ie8: true
	    }
	});

/* html generate automatically */
var HtmlWebpackPlugin = require('html-webpack-plugin');

/* generate all your favicons and icons for you */
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');

/* run any shell commands before or after webpack builds */
var WebpackShellPlugin = require('webpack-shell-plugin');

/* expose the value to global */
var ProvidePlugin = new webpack.ProvidePlugin({
		$: "jquery",
	    jQuery: "jquery",
	    "window.jQuery": "jquery"
	});

/* browserSync */
var BrowserSyncPlugin = require('browser-sync-webpack-plugin');
var BrowserSyncPlugin = new BrowserSyncPlugin({
	host: 'localhost',
	port: 3000,
	server: { baseDir: ['build/'] }
});

/* common chunks */
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");

/* ExtractText */
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CssExtractPlugin = new ExtractTextPlugin("[name].css");

/* postcss loader */
var precss       = require('precss');
var autoprefixer = require('autoprefixer');

/* merge */
var merge = require('webpack-merge');
var TARGET = process.env.npm_lifecycle_event;

/* automatically launch it's application on a browser */
const WebpackBrowserPlugin = require('webpack-browser-plugin-fork');

/* get ip */
function getServerIp() {
  var os = require('os');
  var ifaces = os.networkInterfaces();
  var values = Object.keys(ifaces).map(function(name) {
    return ifaces[name];
  });
  values = [].concat.apply([], values).filter(function(val){
    return val.family == 'IPv4' && val.internal == false;
  });

  return values.length ? values[0].address : '0.0.0.0';
}

var ipAddress = getServerIp();





/* =============================================================
 *  base settings
 * ============================================================ */
var common = {
	entry: {
        vendor: ['jquery', 'app']
    	// app: path.resolve(ROOT_PATH, 'app/components/app/app.js')
    },
    output: {
        filename: '[name].js',
		chunkFilename: '[id].chunk.js'
    },
    module: {
		loaders: [
			//jsx
			{
				test: /\.jsx?$/,
      			loader: 'babel',
      			include: APP_PATH
			},
			//css
			{
				test: /\.css$/,
      			loader: 'style!css!postcss',
      			include: APP_PATH
			},
			//font
			{
			    test   : /\.woff|\.woff2|\.svg|.eot|\.ttf/,
			    loader : 'url?prefix=font/&limit=10000'
			},
		    //url loader
		    {
		    	test: /\.(png|jpg|jpeg|gif)$/,
		    	loader: 'url?limit=10000',
				include: APP_PATH
		    },
		    //json loader
		    {
		    	test: /\.json$/,
		    	loader: 'json',
				include: APP_PATH
		    }
		]
    },
    postcss: function () {
        return [precss, autoprefixer];
    },
    resolve: {
		alias: {
            app: path.resolve(ROOT_PATH, 'app/containers/App/')
        }
    },
    plugins: [
    	//Common Chunk
    	new CommonsChunkPlugin('vendor', 'vendor.js'),
    	// new CommonsChunkPlugin('header-main.js', ['header','main']),

		//html
		new HtmlWebpackPlugin({
			title: 'index page',
			template: path.resolve(ROOT_PATH, 'app/tmpl/index.html'),
			inject: 'body',
			filename: '../index.html',
			hash: false,
			chunks: ['vendor'],
            minify: {
                minifyJS: true,
                collapseWhitespace: true,
                removeComments: true,
                removeRedundantAttributes: true
            }
		}),

    	// ProvidePlugin enable this if you want to expose soem global variable
    ]
}

/* =============================================================
 *  dev
 * ============================================================ */
if(TARGET === 'dev') {
	module.exports = merge(common, {
    	output: {
	        path: path.resolve(BUILD_PATH, 'build/assets/'),
  			publicPath: 'http://' +ipAddress + ':8080/'
	    },
    	devtool: "cheap-module-eval-source-map",
	    module: {
	    	loaders: [
				//jsx
				{
					test: /\.jsx?$/,
	      			loaders: ['babel'],
	      			include: APP_PATH
				},
                //less
                {
                    test: /\.less$/,
                    loader: 'style!css?sourceMap!postcss!less?sourceMap',
                    include: APP_PATH
                },
	    		//sass
				{
			    	test: /\.scss$/,
			    	loader: 'style!css?sourceMap!postcss!sass?sourceMap',
			    	include: APP_PATH
			    }
	    	]
	    },
	    plugins: [
            new WebpackBrowserPlugin({
                url: 'http://' + ipAddress
            }),
			CssExtractPlugin,
			new webpack.DefinePlugin({
		    	'process.env': {
		    		'NODE_ENV': JSON.stringify('development'),
		    	},
		    	'__DEV__': true,
          		'__PRODUCTION__': false
		    }),
    	]
  	});
}


/* =============================================================
 *  browser sync
 * ============================================================ */
if(TARGET === 'browsersync') {
	module.exports = merge(common, {
    	output: {
	        path: path.resolve(ROOT_PATH, 'build/assets/'),
	        publicPath: 'assets/'
	    },
    	devtool: "cheap-module-eval-source-map",
	    module: {
	    	loaders: [
                //less
                {
                    test: /\.less$/,
                    loader: 'style!css?sourceMap!postcss!less?sourceMap',
                    include: APP_PATH
                },
	    		//sass
				{
			    	test: /\.scss$/,
			    	loader: 'style!css?sourceMap!postcss!sass?sourceMap',
			    	include: APP_PATH
			    }
	    	]
	    },
	    plugins: [
			CssExtractPlugin,
	    	BrowserSyncPlugin,
	    	new webpack.DefinePlugin({
				'process.env': {NODE_ENV: '"production"'},
				'__DEV__': false,
          		'__PRODUCTION__': false
			})
    	]
  	});
}


/* =============================================================
 *  deploy
 * ============================================================ */
var deployCommon = merge(common, {
    output: {
        path: path.resolve(ROOT_PATH, 'dist/assets/'),
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            //less
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!less')
            },
            //sass
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss!sass')
            }
        ]
    },
    plugins: [
        UglifyJsPlugin,
        CssExtractPlugin,
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new FaviconsWebpackPlugin({
            logo: './app/public/react-logo.png',
            title: 'react app'
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.DefinePlugin({
            'process.env': {NODE_ENV: '"production"'},
            '__DEV__': false,
            '__PRODUCTION__': true
        })
    ]
});

if (TARGET === 'deploy') {
	module.exports = merge(deployCommon, {
        plugins: [
            new WebpackShellPlugin({onBuildEnd:['static dist/ -a ' + ipAddress + ';']}),
            new WebpackBrowserPlugin({
                url: 'http://' + ipAddress
            })
        ]
    });
}

/* =============================================================
 *  stats
 * ============================================================ */
if (TARGET === 'stats') {
    module.exports = deployCommon;
}
