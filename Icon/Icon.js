/**
 * Provides Agate styled icon components and behaviors.
 *
 * @example
 * <Icon>flag</Icon>
 *
 * @module agate/Icon
 * @exports Icon
 * @exports IconBase
 * @exports IconDecorator
 * @exports icons
 */

import kind from '@enact/core/kind';
import UiIcon from '@enact/ui/Icon';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';

import Skinnable from '../Skinnable';

import iconList from './IconList.js';

import componentCss from './Icon.module.less';

/**
 * Renders an Agate-styled icon without any behavior.
 *
 * @class IconBase
 * @memberof agate/Icon
 * @extends ui/Icon.Icon
 * @ui
 * @public
 */
const IconBase = kind({
	name: 'Icon',

	propTypes: /** @lends agate/Icon.Icon.prototype */ {
		/**
		 * The icon content.
		 *
		 * May be specified as either:
		 *
		 * * A string that represents an icon from the [iconList]{@link ui/Icon.Icon.iconList},
		 * * An HTML entity string, Unicode reference or hex value (in the form '0x...'),
		 * * A URL specifying path to an icon image, or
		 * * An object representing a resolution independent resource (See {@link ui/resolution}).
		 *
		 * @type {String|Object}
		 * @public
		 */
		children: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `icon` - The root class name
		 * * `dingbat` - Applied to dingbat icon
		 * * `focus` - Applied when icon is focused
		 * * `huge` - Applied to a `size='huge'` icon
		 * * `small` - Applied to a `size='small'` icon
		 * * `smallest` - Applied to a `size='smallest'` icon
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The size of the icon.
		 *
		 * @type {('smallest'|'small'|'large'|'huge')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['smallest', 'small', 'large', 'huge']),

		/**
		 * The amount of sprite "cells" in the src image.
		 *
		 * This property only affects image-based icons, not icon glyphs.
		 *
		 * @type {Number}
		 * @default 1
		 * @public
		 */
		spriteCount: PropTypes.number
	},

	defaultProps: {
		size: 'large',
		spriteCount: 1
	},

	styles: {
		css: componentCss
	},

	computed: {
		className: ({size, styler}) => styler.append(
			size
		),
		style: ({spriteCount, style}) => ({
			...style,
			'--agate-icon-sprite-count': spriteCount
		})
	},

	render: (props) => {
		delete props.spriteCount;

		return UiIcon.inline({
			...props,
			css: props.css,
			iconList
		});
	}
});

// Let's find a way to import this list directly, and bonus feature, render our icons in the docs
// next to their names.
/**
 * An object whose keys can be used as the child of an [Icon]{@link agate/Icon.Icon} component.
 *
 * List of Icons:
 * ```
 * circlelarge
 * squarelarge
 * triangleup
 * plus
 * minus
 * arrowup
 * arrowdown
 * arrowleftturn
 * arrowrightturn
 * arrowharpoonright
 * ellipsis
 * check
 * arrowstraightup
 * arrowuturn
 * arrowlargedown
 * arrowlargeup
 * arrowlargeleft
 * arrowlargeright
 * closex
 * search
 * bluetooth2
 * bluetoothoff
 * bright1
 * bright2
 * bluetooth
 * usb
 * volume0
 * volume1
 * volume2
 * wifi
 * happyface
 * notification
 * pairing
 * user
 * calendar
 * edit
 * gallery
 * internet
 * map
 * music
 * video
 * circle
 * previous
 * pairingdisplay
 * box
 * play
 * previoustrack
 * pause
 * nexttrack
 * repeat
 * shuffle
 * error
 * setting
 * popupstop
 * accept
 * decline
 * stop
 * cancel
 * carspeaker
 * speaker
 * earphone
 * detail
 * install
 * send
 * netbook
 * pad
 * mobile
 * update
 * backapp
 * uninstall
 * rain
 * raindrops
 * raincloud
 * snow
 * cloud
 * ice
 * fog
 * sun
 * profileA1
 * profileA2
 * profileA3
 * profileA4
 * profileB1
 * profileB2
 * profileB3
 * profileB4
 * profileC1
 * profileC2
 * profileC3
 * profileC4
 * ac
 * auto
 * airmode
 * airdown
 * airright
 * airup
 * heatseatleft
 * heatseatright
 * aircirculation
 * fan
 * defrosterfront
 * defrosterback
 * airflow
 * home
 * temperature
 * compass
 * phone
 * fanoff
 * datetime
 * display
 * seatbelt
 * apps
 * climate
 * dashboard
 * expand
 * radio
 * rearscreen
 * weather
 * fullscreen
 * menu
 * history
 * browser
 * lock
 * search2
 * bookmark
 * star
 * hollowstar
 * halfstar
 * refresh
 * time
 * pausebold
 * playbold
 * controls
 * diagnostics
 * mapbox
 * displaycontrol
 * controlleft
 * controlright
 * home
 * playlist
 * resume
 * trailer
 * plusbold
 * minusbold
 * ```
 *
 * @name iconList
 * @memberof agate/Icon
 * @constant
 * @type {Object}
 * @public
 */

/**
 * Agate-specific behaviors to apply to [IconBase]{@link agate/Icon.IconBase}.
 *
 * @hoc
 * @memberof agate/Icon
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const IconDecorator = compose(
	Pure,
	Skinnable
);

/**
 * An Agate-styled icon.
 *
 * @class Icon
 * @memberof agate/Icon
 * @extends agate/Icon.IconBase
 * @mixes agate/Icon.IconDecorator
 * @ui
 * @public
 */
const Icon = IconDecorator(IconBase);

export default Icon;
export {
	Icon,
	IconBase,
	IconDecorator,
	iconList as icons
};
