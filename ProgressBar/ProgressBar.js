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
 */

import kind from '@enact/core/kind';
import UiProgressBar from '@enact/ui/ProgressBar';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import componentCss from './ProgressBar.module.less';

/**
 * Renders an Agate-styled progress bar.
 *
 * @class ProgressBar
 * @memberof agate/ProgressBar
 * @extends ui/ProgressBar.ProgressBar
 * @mixes agate/ProgressBar.ProgressBarDecorator
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
		size: PropTypes.oneOf(['small', 'large'])
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
		className: ({size, styler}) => styler.append(size)
	},

	render: ({css, ...rest}) => {
		delete rest.size;

		return (
			<UiProgressBar
				{...rest}
				css={css}
			/>
		);
	}
});

/**
 * Applies Agate specific behaviors to [ProgressBar]{@link agate/ProgressBar.ProgressBar} components.
 *
 * @hoc
 * @memberof agate/ProgressBar
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ProgressBarDecorator = compose(
	Skinnable
);

// Not documenting as base is not very useful to developers.
const ProgressBar = ProgressBarDecorator(ProgressBarBase);

export default ProgressBar;
export {
	ProgressBar,
	ProgressBarBase,
	ProgressBarDecorator
};
