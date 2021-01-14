import kind from '@enact/core/kind';
import {isRtlText} from '@enact/i18n/util';
import {scaleToRem} from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import React from 'react';

import Marquee from '../Marquee';

import css from './Tooltip.module.less';

/**
 * {@link agate/TooltipDecorator.TooltipLabel} is a stateless tooltip component with
 * Agate styling applied.
 *
 * @class TooltipLabel
 * @memberof agate/TooltipDecorator
 * @ui
 * @private
 */
const TooltipLabel = kind({
	name: 'TooltipLabel',

	propTypes: /** @lends agate/TooltipDecorator.TooltipLabel.prototype */ {
		/**
		 * The node to be displayed as the main content of the tooltip.
		 *
		 * @type {Node}
		 * @required
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Centers the text when `marquee` is also set.
		 *
		 * @type {Boolean}
		 * @public
		 */
		centered: PropTypes.bool,

		/**
		 * Apply a marquee to support long text.
		 *
		 * It is recommended that you specify a `width` also. If none is specified, a default width
		 * of 600px will be used.
		 *
		 * @type {Boolean}
		 * @public
		 */
		marquee: PropTypes.bool,

		/**
		 * The width of tooltip content in pixels (px). If the content goes over the given width,
		 * then it will automatically wrap. When `null`, content does not wrap.
		 * If the content goes over the given width, it will automatically wrap, or marquee if
		 * `marquee` is enabled.
		 *
		 * @type {Number|String}
		 * @public
		 */
		width: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
	},

	styles: {
		css,
		className: 'tooltipLabel'
	},

	computed: {
		className: ({marquee, width, styler}) => styler.append({
			multi: (!marquee && !!width),
			marquee
		}),
		style: ({children, width, style}) => {
			return {
				...style,
				direction: isRtlText(children) ? 'rtl' : 'ltr',
				'--agate-tooltip-label-width': (typeof width === 'number' ? scaleToRem(width) : width)
			};
		}
	},

	render: ({centered, children, marquee, ...rest}) => {
		delete rest.width;

		if (marquee) {
			return (
				<Marquee {...rest} alignment={centered ? 'center' : null} marqueeOn="render">
					{children}
				</Marquee>
			);
		} else {
			return (
				<div {...rest}>
					{children}
				</div>
			);
		}
	}
});

export default TooltipLabel;
export {
	TooltipLabel
};
