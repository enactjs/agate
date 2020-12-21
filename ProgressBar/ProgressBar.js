/**
 * Provides an Agate-themed progress bar component.
 *
 * @example
 * <ProgressBar progress={0.5} backgroundProgress={0.75} />
 *
 * @module agate/ProgressBar
 * @exports ProgressBar
 * @exports ProgressBarBase
 * @exports ProgressBarTooltip
 */

import kind from '@enact/core/kind';
import ComponentOverride from '@enact/ui/ComponentOverride';
import Pure from '@enact/ui/internal/Pure';
import UiProgressBar from '@enact/ui/ProgressBar';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import componentCss from './ProgressBar.module.less';
import {ProgressBarTooltip} from './ProgressBarTooltip';

/**
 * Renders an Agate-styled progress bar.
 *
 * @class ProgressBar
 * @memberof agate/ProgressBar
 * @extends ui/ProgressBar.ProgressBar
 * @mixes agate/Skinnable.Skinnable
 * @ui
 * @public
 */
const ProgressBarBase = kind({
	name: 'ProgressBar',

	propTypes: /** @lends agate/ProgressBar.ProgressBar.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `progressBar` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Highlights the filled portion.
		 *
		 * @type {Boolean}
		 * @public
		 */
		highlighted: PropTypes.bool,

		/**
		 * Sets the orientation of the progress bar.
		 *
		 * @type {('horizontal'|'vertical'|'radial')}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical', 'radial']),

		/**
		 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		progress: PropTypes.number,

		/**
		 * Displays an anchor at `progressAnchor`.
		 *
		 * @type {Boolean}
		 * @public
		 */
		showAnchor: PropTypes.bool,

		/**
		 * The size of the progress bar.
		 *
		 * @type {('small'|'large')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['small', 'large']),

		/**
		 * Enables the built-in tooltip.
		 *
		 * To customize the tooltip, pass either a custom tooltip component or an instance of
		 * [ProgressBarTooltip]{@link agate/ProgressBar.ProgressBarTooltip} with additional
		 * props configured.
		 *
		 * The provided component will receive the following props from `ProgressBar`:
		 *
		 * * `orientation`  - The value of `orientation`
		 * * `percent`      - Always `true` indicating the value should be presented as a percentage
		 *                    rather than an absolute value
		 * * `progress`     - The `value` as a proportion between `min` and `max`
		 * * `visible`      - Always `true` indicating that the tooltip should be visible
		 *
		 * Usage:
		 * ```
		 * <ProgressBar
		 *   tooltip={
		 *     <ProgressBarTooltip position="after" />
		 *   }
		 * />
		 * ```
		 *
		 * The tooltip may also be passed as a child via the `"tooltip"` slot. See
		 * [Slottable]{@link ui/Slottable} for more information on how slots can be used.
		 *
		 * Usage:
		 * ```
		 * <ProgressBar>
		 *   <ProgressBarTooltip position="after" />
		 * </ProgressBar>
		 * ```
		 *
		 * @type {Boolean|Component|Element}
		 * @public
		 */
		tooltip: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.func])
	},

	defaultProps: {
		orientation: 'horizontal',
		progress: 0,
		size: 'large'
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	computed: {
		className: ({highlighted, showAnchor, size, styler}) => styler.append({
			highlighted,
			showAnchor,
			size
		}),
		tooltip: ({tooltip}) => tooltip === true ? ProgressBarTooltip : tooltip
	},

	render: ({css, orientation, progress, tooltip, ...rest}) => {
		delete rest.tooltip;
		delete rest.highlighted;
		delete rest.showAnchor;
		delete rest.size;

		return (
			<UiProgressBar
				{...rest}
				orientation={orientation}
				progress={progress}
				css={css}
			>
				<ComponentOverride
					component={tooltip}
					orientation={orientation}
					percent
					proportion={progress}
					visible
				/>
			</UiProgressBar>
		);
	}
});

/**
 * Agate-specific behaviors to apply to [ProgressBar]{@link agate/ProgressBar.ProgressBarBase}.
 *
 * @hoc
 * @memberof agate/ProgressBar
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ProgressBarDecorator = compose(
	Pure,
	Slottable({slots: ['tooltip']}),
	Skinnable
);

/**
 * The ready-to-use Agate-styled ProgressBar.
 *
 * @class ProgressBar
 * @memberof agate/ProgressBar
 * @extends agate/ProgressBar.ProgressBarBase
 * @mixes agate/ProgressBar.ProgressBarDecorator
 * @ui
 * @public
 */
const ProgressBar = ProgressBarDecorator(ProgressBarBase);

export default ProgressBar;
export {
	ProgressBar,
	ProgressBarBase,
	ProgressBarDecorator,
	ProgressBarTooltip
};
