/**
 * Provides Agate-themed indeterminate progress indicator (spinner) components and behaviors.
 *
 * Used for indicating to the user that something is busy and interaction is temporarily suspended.
 *
 * @example
 * <Spinner color="light" />
 *
 * @module agate/Spinner
 * @exports Spinner
 * @exports SpinnerBase
 * @exports SpinnerDecorator
 */
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import Pure from '@enact/ui/internal/Pure';
import compose from 'ramda/src/compose';
import React from 'react';
import UiSpinnerBase from '@enact/ui/Spinner';

import Skinnable from '../Skinnable';

import componentCss from './Spinner.module.less';

const createSpinnerNodes = (numberOfNodes, css) => [...Array(numberOfNodes)].map((_, index) => <div className={css[`fan${index + 1}`]} />);

/**
 * A component that shows spinning balls, with optional text as children.
 *
 * @class SpinnerCore
 * @memberof agate/Spinner
 * @ui
 * @private
 */
const SpinnerCore = kind({
	name: 'SpinnerCore',

	propTypes: {
		css: PropTypes.object,
		type: PropTypes.string
	},

	defaultProps: {
		type: 'searching'
	},

	styles: {
		css: componentCss
	},

	computed: {
		className: ({styler, type}) => styler.append(type),
		spinnerNodes: ({css, type}) => type === 'searching' ? createSpinnerNodes(12, css) : createSpinnerNodes(4, css)
	},

	render: ({css, spinnerNodes, type, ...rest}) => (
		<div aria-label={type} aria-live="off" role="alert" {...rest}>
			<div className={css.bg}>
				{spinnerNodes}
			</div>
		</div>
	)
});

/**
 * The base component, defining all of the properties.
 *
 * @class SpinnerBase
 * @memberof agate/Spinner
 * @ui
 * @public
 */
const SpinnerBase = kind({
	name: 'Spinner',

	propTypes: /** @lends agate/Spinner.SpinnerBase.prototype */ {
		/**
		 * Customize the color of spinner.
		 *
		 * @type {('dark'|'light')}
		 * @default 'light'
		 * @public
		 */
		color: PropTypes.string,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `spinner` - The root component class, unless there is a scrim. The scrim and floating layer can be a sibbling or parent to this root "spinner" element.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Customize the size of this component.
		 *
		 * Recommended usage is "medium" (default) for standalone and popup scenarios, while "small"
		 * is best suited for use inside other elements, like {@link agate/SlotItem.SlotItem}.
		 *
		 * @type {('medium'|'small')}
		 * @default 'medium'
		 * @public
		 */
		size: PropTypes.oneOf(['medium', 'small']),

		/**
		 * Removes the background color (making it transparent).
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		transparent: PropTypes.bool
	},

	defaultProps: {
		size: 'medium',
		transparent: false
	},

	styles: {
		css: componentCss,
		publicClassNames: 'spinner'
	},

	computed: {
		className: ({children, color, size, transparent, styler}) => styler.append(
			color,
			size,
			{content: !!children, transparent}
		)
	},

	render: ({children, css, ...rest}) => {
		delete rest.transparent;

		return (
			<UiSpinnerBase
				{...rest}
				css={css}
				component={SpinnerCore}
			>
				{children}
			</UiSpinnerBase>
		);
	}
});

/**
 * Agate-specific Spinner behaviors to apply to [Spinner]{@link agate/Spinner.Spinner}.
 *
 * @hoc
 * @memberof agate/Spinner
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const SpinnerDecorator = compose(
	Pure,
	Skinnable
);

/**
 * A Agate-styled Spinner.
 *
 * @class Spinner
 * @memberof agate/Spinner
 * @mixes agate/Spinner.SpinnerDecorator
 * @ui
 * @public
 */
const Spinner = SpinnerDecorator(SpinnerBase);


export default Spinner;
export {
	Spinner,
	SpinnerBase,
	SpinnerDecorator
};
