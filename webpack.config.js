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
		compress: {
	        warnings: false
	    }
	});

/* html generate automatically */
var HtmlWebpackPlugin = require('html-webpack-plugin');

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

// merge
var merge = require('webpack-merge');
var TARGET = process.env.npm_lifecycle_event;





/* =============================================================
 *  base settings
 * ============================================================ */
var common = {
	entry: {
    	app: ['react','index']
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
      			loader: 'style!css',
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
    resolve: {
		alias: {
			react: 'react',
			index: path.resolve(ROOT_PATH, 'app/index.js')
		}
    },
    plugins: [
    	//Common Chunk
    	new CommonsChunkPlugin('app', 'app.js'),
    	// new CommonsChunkPlugin('header-main.js', ['header','main']),
    	
		//html
		new HtmlWebpackPlugin({
			title: 'index page',
			template: path.resolve(ROOT_PATH, 'app/tmpl/index.html'),
			inject: 'body',
			filename: '../index.html',
			hash: false,
			chunks: ['app']
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
  			publicPath: 'http://127.0.0.1:8080/'
	    },
    	devtool: "source-map",
	    module: {
	    	loaders: [
				//jsx
				{
					test: /\.jsx?$/,
	      			loaders: ['react-hot', 'babel'],
	      			include: APP_PATH
				},
	    		//sass
				{
			    	test: /\.scss$/,
			    	loader: 'style!css?sourceMap!autoprefixer!sass?sourceMap',
			    	include: APP_PATH
			    }
	    	]
	    },
	    plugins: [
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
    	devtool: "source-map",
	    module: {
	    	loaders: [
	    		//sass
				{
			    	test: /\.scss$/,
			    	loader: 'style!css?sourceMap!autoprefixer!sass?sourceMap',
			    	// loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass'),
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
if (TARGET === 'deploy') {
	module.exports = merge(common, {
    	output: {
	        path: path.resolve(ROOT_PATH, 'dist/assets/'),
	        publicPath: 'assets/'
	    },
	    module: {
	    	loaders: [
	    		//sass
				{
			    	test: /\.scss$/,
			    	loader: ExtractTextPlugin.extract('style', 'css!autoprefixer!sass'),
			    	include: APP_PATH
			    }
	    	]
	    },
	    plugins: [
			UglifyJsPlugin,
			CssExtractPlugin,
			new webpack.DefinePlugin({
				'process.env': {NODE_ENV: '"production"'},
				'__DEV__': false,
          		'__PRODUCTION__': true
			})
    	]
  	});
}