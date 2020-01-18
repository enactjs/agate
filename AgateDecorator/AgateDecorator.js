/**
 * Applies Agate specific styling and behaviors.
 *
 * @module agate/AgateDecorator
 * @exports AgateDecorator
 */

import {addAll} from '@enact/core/keymap';
import classnames from 'classnames';
import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import I18nDecorator from '@enact/i18n/I18nDecorator';
import React from 'react';
import PropTypes from 'prop-types';
import {ResolutionDecorator} from '@enact/ui/resolution';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import SpotlightRootDecorator from '@enact/spotlight/SpotlightRootDecorator';
import convert from 'color-convert';

import Chronometer from '../Chronometer';
import Skinnable from '../Skinnable';

import screenTypes from './screenTypes.json';
import css from './AgateDecorator.module.less';

/**
 * Default config for {@link agate/AgateDecorator.AgateDecorator}.
 *
 * @memberof agate/AgateDecorator.AgateDecorator
 * @hocconfig
 */
const defaultConfig = /** @lends agate/AgateDecorator.AgateDecorator.defaultConfig */ {
	/**
	 * Enables customization of a skin's highlight and accent color.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	customSkin: true,

	/**
	 * Enables a floating layer for popup components.
	 *
	 * If `false`, app will be responsible for applying the decorator.
	 *
	 * @type {Boolean}
	 * @default true
	 * @see {@link ui/FloatingLayer.FloatingLayerDecorator}
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
	 * @public
	 */
	i18n: true,

	/**
	 * Disables setting spotlight focus on first render.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	noAutoFocus: false,

	/**
	 * Enables overlay mode (no background color will be applied).
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	overlay: false,

	/**
	 * Override the resolution independence settings.
	 *
	 * @type {Object}
	 * @see {@link ui/resolution}
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
	 * @public
	 */
	spotlight: true
};

// TODO: If this will be public it should be documented or perhaps the props
// added to `AgateDecorator`
const CustomizableSkinStyle = kind({
	name: 'CustomizableSkinStyle',

	propTypes: {
		className: PropTypes.string.isRequired,

		/**
		 * A custom accent color, as a hex string.
		 *
		 * @memberof agate/AgateDecorator.AgateDecorator.prototype
		 * @type {String}
		 * @default '#8b7efe'
		 * @public
		 */
		accent: PropTypes.string,

		/**
		 * A custom highlight color, as a hex string.
		 *
		 * @memberof agate/AgateDecorator.AgateDecorator.prototype
		 * @type {String}
		 * @default '#c6c0fe'
		 * @public
		 */
		highlight: PropTypes.string
	},

	// TODO: Consider allowing `null` and dropping this override completely
	defaultProps: {
		accent: '#8b7efe',
		highlight: '#c6c0fe'
	},

	computed: {
		cssRules: ({className, accent, date, highlight}) => {
			const accentObj = convert.hex.hsl(accent);
			const highlightObj = convert.hex.hsl(highlight);

			const secPercent = date.getSeconds() / 60;
			const hueSec = ((secPercent * 255) + accentObj[0]) % 255;

			const updatedAccent = '#' + convert.hsl.hex(hueSec, accentObj[1], accentObj[2]);

			const style = {
				'--agate-accent-color': updatedAccent,
				'--agate-accent-h': hueSec,
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
 * {@link agate/AgateDecorator.AgateDecorator} is a Higher-order Component that applies
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
 * @class AgateDecorator
 * @memberof agate/AgateDecorator
 * @mixes ui/FloatingLayer.FloatingLayerDecorator
 * @mixes ui/resolution.ResolutionDecorator
 * @mixes spotlight/SpotlightRootDecorator.SpotlightRootDecorator
 * @mixes agate/Skinnable.Skinnable
 * @hoc
 * @public
 */
const AgateDecorator = hoc(defaultConfig, (config, Wrapped) => {
	// TODO: Document props passable to hoc ()
	const {customSkin, float, i18n, noAutoFocus, overlay, ri, skin, spotlight} = config;

	const bgClassName = classnames(
		'enact-fit',
		{
			[css.bg]: !overlay
		}
	);

	let App = Wrapped;
	if (float) App = FloatingLayerDecorator({wrappedClassName: bgClassName}, App);
	if (ri) App = ResolutionDecorator(ri, App);
	if (i18n) App = I18nDecorator(App);
	if (spotlight) App = SpotlightRootDecorator({noAutoFocus}, App);
	if (skin) App = Skinnable({defaultSkin: 'gallium'}, App);

	// add webOS-specific key maps
	addAll({
		cancel: 461,
		pointerHide: 1537,
		pointerShow: 1536
	});

	const Decorator = class extends React.Component {
		static displayName = 'AgateDecorator';

		static propTypes = {
			accent: PropTypes.string,
			highlight: PropTypes.string
		}

		render () {
			const {accent, className, date, highlight, ...rest} = this.props;
			const customizableSkinClassName = 'agate-customized-skin';

			const allClassNames = classnames(
				className,
				'enact-unselectable',
				bgClassName,
				css.root,
				{[customizableSkinClassName]: customSkin},
			);

			return (
				<React.Fragment>
					{customSkin ? <CustomizableSkinStyle className={customizableSkinClassName} date={date} accent={accent} highlight={highlight} /> : null}
					<App {...rest} className={allClassNames} />
				</React.Fragment>
			);
		}
	};

	return Chronometer({tickFrequency: 'second'}, Decorator);
});

export default AgateDecorator;
export {AgateDecorator};
