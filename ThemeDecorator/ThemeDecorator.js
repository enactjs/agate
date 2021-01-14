/**
 * Applies Agate specific styling and behaviors.
 *
 * @module agate/ThemeDecorator
 * @exports ThemeDecorator
 * @exports ThemeContext
 */

import hoc from '@enact/core/hoc';
import {addAll} from '@enact/core/keymap';
import kind from '@enact/core/kind';
import I18nDecorator from '@enact/i18n/I18nDecorator';
import SpotlightRootDecorator from '@enact/spotlight/SpotlightRootDecorator';
import {ResolutionDecorator} from '@enact/ui/resolution';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import classnames from 'classnames';
import convert from 'color-convert';
import PropTypes from 'prop-types';
import React from 'react';

import Skinnable from '../Skinnable';

import screenTypes from './screenTypes.json';
import css from './ThemeDecorator.module.less';

const ThemeContext = React.createContext(null);

const defaultColors = {
	carbon: {
		accent: '#8fd43a',
		highlight: '#6abe0b'
	},
	cobalt: {
		accent: '#8c81ff',
		highlight: '#ffffff'
	},
	copper: {
		accent: '#a47d66',
		highlight: '#ffffff'
	},
	electro: {
		accent: '#0359f0',
		highlight: '#ff8100'
	},
	gallium: {
		accent: '#8b7efe',
		highlight: '#e16253'
	},
	silicon: {
		accent: '#f1304f',
		highlight: '#9e00d8'
	},
	titanium: {
		accent: '#a6a6a6',
		highlight: '#2a48ca'
	}
};

/**
 * Default config for {@link agate/ThemeDecorator.ThemeDecorator}.
 *
 * @memberof agate/ThemeDecorator.ThemeDecorator
 * @hocconfig
 */
const defaultConfig = /** @lends agate/ThemeDecorator.ThemeDecorator.defaultConfig */ {
	/**
	 * Enables customization of a skin's highlight and accent color.
	 *
	 * @type {Boolean}
	 * @default true
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	customSkin: true,

	/**
	 * Disables use of full screen.
	 *
	 * @type {Boolean}
	 * @default false
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	disableFullscreen: false,

	/**
	 * Enables a floating layer for popup components.
	 *
	 * If `false`, app will be responsible for applying the decorator.
	 *
	 * @type {Boolean}
	 * @default true
	 * @see {@link ui/FloatingLayer.FloatingLayerDecorator}
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	float: true,

	/**
	 * Applies I18nDecorator.
	 *
	 * If `false`, app will be responsible for applying the decorator.
	 *
	 * @type {Boolean}
	 * @default true
	 * @see {@link i18n/I18nDecorator}
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	i18n: true,

	/**
	 * Disables setting spotlight focus on first render.
	 *
	 * @type {Boolean}
	 * @default false
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	noAutoFocus: false,

	/**
	 * Enables overlay mode (no background color will be applied).
	 *
	 * @type {Boolean}
	 * @default false
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	overlay: false,

	/**
	 * Override the resolution independence settings.
	 *
	 * @type {Object}
	 * @see {@link ui/resolution}
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	ri: {
		screenTypes
	},

	/**
	 * Applies skinning support.
	 *
	 * @type {Boolean}
	 * @default true
	 * @see {@link agate/Skinnable}
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	skin: true,

	/**
	 * Applies spotlight decorator.
	 *
	 * If `false`, app will be responsible for applying the decorator.
	 *
	 * @type {Boolean}
	 * @default true
	 * @see {@link spotlight/SpotlightRootDecorator}
	 * @memberof agate/ThemeDecorator.ThemeDecorator.defaultConfig
	 * @public
	 */
	spotlight: true
};

// TODO: If this will be public it should be documented or perhaps the props
// added to `ThemeDecorator`
const CustomizableSkinStyle = kind({
	name: 'CustomizableSkinStyle',

	propTypes: {
		className: PropTypes.string.isRequired,
		/**
		 * A custom accent color, as a hex string.
		 *
		 * @memberof agate/ThemeDecorator.CustomizableSkinStyle.prototype
		 * @type {String}
		 * @default '#8b7efe'
		 * @private
		 */
		accent: PropTypes.string,
		/**
		 * A custom highlight color, as a hex string.
		 *
		 * @memberof agate/ThemeDecorator.CustomizableSkinStyle.prototype
		 * @type {String}
		 * @default '#c6c0fe'
		 * @private
		 */
		highlight: PropTypes.string
	},

	// TODO: Consider allowing `null` and dropping this override completely
	defaultProps: {
		accent: '#8b7efe',
		highlight: '#c6c0fe'
	},

	computed: {
		cssRules: ({className, accent, highlight}) => {
			const accentObj = convert.hex.hsl(accent);
			const highlightObj = convert.hex.hsl(highlight);

			const style = {
				'--agate-accent-color': accent,
				'--agate-accent-h': accentObj[0],
				'--agate-accent-s': accentObj[1] + '%',
				'--agate-accent-l': accentObj[2] + '%',
				'--agate-highlight-color': highlight,
				'--agate-highlight-h': highlightObj[0],
				'--agate-highlight-s': highlightObj[1] + '%',
				'--agate-highlight-l': highlightObj[2] + '%'
			};

			let styleRules = '';
			for (const rule in style) {
				styleRules += `\t${rule}: ${style[rule]};\n`;
			}
			return `.${className} {\n${styleRules}}\n`;
		}
	},

	render: ({cssRules, ...rest}) => {
		delete rest.className;
		return (cssRules ? <style type="text/css" {...rest}>{cssRules}</style> : null);
	}
});

/**
 * {@link agate/ThemeDecorator.ThemeDecorator} is a Higher-order Component that applies
 * Agate theming to an application. It also applies
 * [floating layer]{@link ui/FloatingLayer.FloatingLayerDecorator},
 * [resolution independence]{@link ui/resolution.ResolutionDecorator},
 * [skin support]{@link ui/Skinnable}, [spotlight]{@link spotlight.SpotlightRootDecorator}, and
 * [internationalization support]{@link i18n/I18nDecorator.I18nDecorator}. It is meant to be applied to
 * the root element of an app.
 *
 * [Skins]{@link ui/Skinnable} provide a way to change the coloration of your app. The currently
 * supported skins for Agate are "agate" (the default, dark skin) and "agate-light".
 * Use the `skin` property to assign a skin. Ex: `<DecoratedApp skin="light" />`
 *
 * @class ThemeDecorator
 * @hoc
 * @memberof agate/ThemeDecorator
 * @mixes ui/FloatingLayer.FloatingLayerDecorator
 * @mixes ui/resolution.ResolutionDecorator
 * @mixes spotlight/SpotlightRootDecorator.SpotlightRootDecorator
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ThemeDecorator = hoc(defaultConfig, (config, Wrapped) => {
	// TODO: Document props passable to hoc ()
	const {customSkin, float, i18n, noAutoFocus, overlay, ri, skin, spotlight, disableFullscreen} = config;
	const defaultSkin = 'gallium';

	const bgClassName = classnames(
		{
			'enact-fit': !disableFullscreen,
			[css.bg]: !overlay
		}
	);

	let App = Wrapped;
	if (float) App = FloatingLayerDecorator({wrappedClassName: bgClassName}, App);
	if (ri) App = ResolutionDecorator(ri, App);
	if (i18n) App = I18nDecorator({sync: true}, App);
	if (spotlight) App = SpotlightRootDecorator({noAutoFocus}, App);
	if (skin) App = Skinnable({defaultSkin}, App);

	// add webOS-specific key maps
	addAll({
		cancel: 461,
		pointerHide: 1537,
		pointerShow: 1536
	});

	const Decorator = class extends React.Component {
		static displayName = 'ThemeDecorator';

		static propTypes = /** @lends agate/ThemeDecorator.ThemeDecorator.prototype */ {
			/**
			 * A custom accent color, as a hex string.
			 *
			 * @memberof agate/ThemeDecorator.ThemeDecorator.prototype
			 * @type {String}
			 * @public
			 */
			accent: PropTypes.string,
			/**
			 * A custom highlight color, as a hex string.
			 *
			 * @memberof agate/ThemeDecorator.ThemeDecorator.prototype
			 * @type {String}
			 * @public
			 */
			highlight: PropTypes.string,

			/**
			 * The name of the skin a component should use to render itself.
			 *
			 * @type {String}
			 * @public
			 */
			skin: PropTypes.string
		};

		render () {
			const currentSkin = this.props.skin || defaultSkin;
			const {accent = defaultColors[currentSkin].accent, className, highlight = defaultColors[currentSkin].highlight, ...rest} = this.props;
			const customizableSkinClassName = 'agate-customized-skin';

			const allClassNames = classnames(
				className,
				'enact-unselectable',
				css.root,
				{
					[customizableSkinClassName]: customSkin,
					[bgClassName]: !float,
					'enact-fit': !disableFullscreen
				}
			);

			return (
				<ThemeContext.Provider value={{accent, highlight}}>
					{customSkin ? <CustomizableSkinStyle className={customizableSkinClassName} accent={accent} highlight={highlight} /> : null}
					<App {...rest} accent={accent} highlight={highlight} className={allClassNames} />
				</ThemeContext.Provider>
			);
		}
	};

	return Decorator;
});

export default ThemeDecorator;
export {
	ThemeDecorator,
	ThemeContext
};
