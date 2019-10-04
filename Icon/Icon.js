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
 * Renders a agate-styled icon without any behavior.
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
		 * The size of the icon.
		 *
		 * @type {('small'|'large'|'huge')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large', 'huge']),

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
 * plus
 * minus
 * arrowhookleft
 * arrowhookright
 * ellipsis
 * check
 * circle
 * stop
 * play
 * pause
 * forward
 * backward
 * skipforward
 * skipbackward
 * pauseforward
 * pausebackward
 * pausejumpforward
 * pausejumpbackward
 * jumpforward
 * jumpbackward
 * denselist
 * bulletlist
 * list
 * drawer
 * arrowlargedown
 * arrowlargeup
 * arrowlargeleft
 * arrowlargeright
 * arrowsmallup
 * arrowsmalldown
 * arrowsmallleft
 * arrowsmallright
 * closex
 * search
 * rollforward
 * rollbackward
 * exitfullscreen
 * fullscreen
 * arrowshrinkleft
 * arrowshrinkright
 * arrowextend
 * arrowshrink
 * flag
 * funnel
 * trash
 * star
 * hollowstar
 * halfstar
 * gear
 * plug
 * lock
 * forward15
 * back15
 * continousplay
 * playlist
 * resumeplay
 * image
 * audio
 * music
 * languages
 * cc
 * ccon
 * ccoff
 * sub
 * recordings
 * livezoom
 * liveplayback
 * liveplaybackoff
 * repeat
 * repeatoff
 * series
 * repeatdownload
 * view360
 * view360off
 * info
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
 * A Agate-styled icon.
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
