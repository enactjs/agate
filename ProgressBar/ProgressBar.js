/**
 * Provides an Agate-themed progress bar component.
 *
 * @example
 * <ProgressBar progress={0.5} backgroundProgress={0.75} />
 *
 * @module agate/ProgressBar
 * @exports ProgressBar
 * @exports ProgressBarBase
 * @exports ProgressBarDecorator
 * @exports ProgressBarTooltip
 */

import kind from '@enact/core/kind';
import ComponentOverride from '@enact/ui/ComponentOverride';
import Pure from '@enact/ui/internal/Pure';
import UiProgressBar from '@enact/ui/ProgressBar';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';

import Skinnable from '../Skinnable';

import {ProgressBarTooltip} from './ProgressBarTooltip';

import componentCss from './ProgressBar.module.less';

/**
 * Renders an Agate-styled progress bar.
 *
 * @class ProgressBarBase
 * @memberof agate/ProgressBar
 * @extends ui/ProgressBar.ProgressBar
 * @ui
 * @public
 */
const ProgressBarBase = kind({
	name: 'ProgressBar',

	propTypes: /** @lends agate/ProgressBar.ProgressBarBase.prototype */ {
		/**
		 * The proportion of the loaded portion of the progress bar.
		 *
		 * * Valid values are between `0` and `1`.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		backgroundProgress: PropTypes.number,

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
		 * @type {('horizontal'|'vertical')}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['horizontal', 'vertical']),

		/**
		 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		progress: PropTypes.number,

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
		 * {@link agate/ProgressBar.ProgressBarTooltip|ProgressBarTooltip} with additional
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
		 * {@link ui/Slottable|Slottable} for more information on how slots can be used.
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
		backgroundProgress: 0,
		orientation: 'horizontal',
		progress: 0,
		size: 'large'
	},

	styles: {
		css: componentCss,
		publicClassNames: true
	},

	computed: {
		className: ({highlighted, size, styler}) => styler.append({highlighted}, size),
		tooltip: ({tooltip}) => tooltip === true ? ProgressBarTooltip : tooltip
	},

	render: ({css, orientation, progress, tooltip, ...rest}) => {
		delete rest.highlighted;
		delete rest.tooltip;
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
 * Agate-specific behaviors to apply to {@link agate/ProgressBar.ProgressBarBase|ProgressBar}.
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
