/**
 * Exports the {@link agate/AgateDecorator.AgateDecorator} HOC
 *
 * @module agate/AgateDecorator
 */

import {addAll} from '@enact/core/keymap';
import classnames from 'classnames';
import hoc from '@enact/core/hoc';
import React from 'react';
import I18nDecorator from '@enact/i18n/I18nDecorator';
import {ResolutionDecorator} from '@enact/ui/resolution';
import {FloatingLayerDecorator} from '@enact/ui/FloatingLayer';
import SpotlightRootDecorator from '@enact/spotlight/SpotlightRootDecorator';


import Skinnable from '../Skinnable';

import I18nFontDecorator from './I18nFontDecorator';
import screenTypes from './screenTypes.json';
import css from './AgateDecorator.less';

/**
 * Default config for {@link agate/AgateDecorator.AgateDecorator}.
 *
 * @memberof agate/AgateDecorator
 * @hocconfig
 */
const defaultConfig = {
	float: true,
	i18n: true,
	noAutoFocus: false,
	ri: {
		screenTypes
	},
	spotlight: true,
	skin: true
};

/**
 * {@link agate/AgateDecorator.AgateDecorator} is a Higher-order Component that applies
 * Agate theming to an application. It also applies
 * [floating layer]{@link ui/FloatingLayer.FloatingLayerDecorator},
 * [resolution independence]{@link ui/resolution.ResolutionDecorator},
 * [custom text sizing]{@link agate/AgateDecorator.TextSizeDecorator},
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
 * @hoc
 * @public
 */
const AgateDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {float, i18n, noAutoFocus, ri, skin, spotlight} = config;

	const bgClassName = 'enact-fit';

	let App = Wrapped;
	if (float) App = FloatingLayerDecorator({wrappedClassName: bgClassName}, App);
	if (i18n) {
		// Apply the @enact/i18n decorator around the font decorator so the latter will update the
		// font stylesheet when the locale changes
		App = I18nDecorator(
			I18nFontDecorator(
				App
			)
		);
	}
	if (ri) App = ResolutionDecorator(ri, App);
	if (spotlight) App = SpotlightRootDecorator({noAutoFocus}, App);
	if (skin) App = Skinnable({defaultSkin: 'main'}, App);

	// add webOS-specific key maps
	addAll({
		cancel: 461,
		pointerHide: 1537,
		pointerShow: 1536
	});

	const Decorator = class extends React.Component {
		static displayName = 'AgateDecorator';

		render () {
			const className = classnames(
				this.props.className,
				'enact-unselectable',
				bgClassName,
				css.root
			);

			return (
				<App {...this.props} className={className} />
			);
		}
	};

	return Decorator;
});

export default AgateDecorator;
export {AgateDecorator};
