/**
 * Provides Agate-themed slider components and behaviors.
 *
 * @example/**
 * Provides Agate-themed progress bar component.
 *
 * @example
 * <ProgressBar progress={0.5} backgroundProgress={0.75} />
 *
 * @module agate/ProgressBar
 * @exports ProgressBar
 */

import kind from '@enact/core/kind';
import UiProgressBar from '@enact/ui/ProgressBar';
import PropTypes from 'prop-types';
import React from 'react';

import Skinnable from '../Skinnable';

import componentCss from './ProgressBar.less';

/**
 * Renders a moonstone-styled progress bar.
 *
 * @class ProgressBarBase
 * @memberof moonstone/ProgressBar
 * @ui
 * @public
 */
const ProgressBar = kind({
	name: 'ProgressBar',

	propTypes: /** @lends moonstone/ProgressBar.ProgressBarBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
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
		 * Sets the orientation of the slider.
		 *
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
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
		 * Sets the small styling to progress bar
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		small: PropTypes.bool
	},

	defaultProps: {
		orientation: 'horizontal',
		progress: 0
	},

	styles: {
		css: componentCss
	},

	computed: {
		className: ({small, styler}) => styler.append({small})
	},

	render: ({css, ...rest}) => {
		delete rest.small;

		return (
			<UiProgressBar
				{...rest}
				css={css}
			/>
		);
	}
});


export default Skinnable(ProgressBar);
