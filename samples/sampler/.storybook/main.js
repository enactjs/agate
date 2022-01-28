/* global __dirname */

const webpack = require('@enact/storybook-utils/configs/webpack');
const path = require('path');

module.exports = {
	features: {
		postcss: false
	},
	stories: ['./../stories/default/*.js'],
	addons: [
		'@enact/storybook-utils/addons/actions/register',
		'@enact/storybook-utils/addons/controls/register',
		'@enact/storybook-utils/addons/docs/register',
		'@enact/storybook-utils/addons/toolbars/register',
		'../custom-addon/register.js'
	],
	webpackFinal: async (config, {configType}) => {
		return webpack(config, configType, __dirname);
	}
};

// module.exports = {
// 	// defines where storybook will locate our stories
// 	features: {
// 		postcss: false
// 	},
// 	stories: ['./../stories/default/*.js'],
// 	addons: [
// 		'@enact/storybook-utils/addons/actions/register',
// 		'@enact/storybook-utils/addons/controls/register',
// 		'@enact/storybook-utils/addons/docs/register',
// 		'@enact/storybook-utils/addons/toolbars/register',
// 		'../custom-addon/register.js'
// 	],
// 	// webpackFinal: async (config, {configType}) => {
// 	// 	return webpack(config, configType, __dirname);
// 	// },

  
// 	babel: async (options) => {
// 	  return {
// 		...options,
// 	  };
// 	},
  
// 	webpackFinal: async (config, { configType }) => {
// 	  // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
// 	  // You can change the configuration based on that.
// 	  // 'PRODUCTION' is used when building the static version of storybook.
  
// 	  // here we use babel-loader
// 	  config.module.rules.push({
// 		test: /\.(js|jsx)$/, 
// 		loader: require.resolve('babel-loader'),
// 		options: {
// 		  babelrc: false,
// 		  presets: [
// 			'@babel/preset-typescript', 
// 			[
// 			  '@babel/preset-react',
// 			  {
// 				runtime: 'automatic', 
// 			  },
// 			],
			
// 		  ],
// 		  plugins: [
// 			['@babel/plugin-proposal-nullish-coalescing-operator'],
// 			['@babel/plugin-proposal-optional-chaining'],
// 			['@teclone/babel-plugin-styled-components'],
		
// 		  ],
// 		},
// 	  });
  
// 	  config.resolve.modules = [
// 		path.resolve(__dirname, '../', 'node_modules'),
// 		'node_modules',
// 	  ];
  
// 	  config.resolve.extensions.push('.js', '.jsx');
  
// 	  config.stats = 'verbose';
  
// 	  // Return the altered config
// 	  return config;
// 	},
//   };