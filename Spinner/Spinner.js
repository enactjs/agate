/**
 * Provides Agate-themed indeterminate progress indicator (spinner) components and behaviors.
 *
 * Used for indicating to the user that something is busy and interaction is temporarily suspended.
 *
 * @example
 * <Spinner color="light" size="small" type="searching" />
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

/**
 * A component that shows spinning fan. Or bouncing 🏀🎾🏐⚽️.
 *
 * @class SpinnerCore
 * @memberof agate/Spinner
 * @ui
 * @private
 */
const SpinnerCore = kind({
	name: 'SpinnerCore',

	propTypes: /** @lends agate/Spinner.SpinnerCore.prototype */ {
		/**
		 * The "aria-label" for the component.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		css: PropTypes.object,

		/**
		 * The type of spinner.
		 *
		 * @type {('loading'|'searching')}
		 * @default 'searching'
		 * @public
		 */
		type: PropTypes.string
	},

	defaultProps: {
		type: 'searching'
	},

	styles: {
		css: componentCss
	},

	computed: {
		'aria-label': ({'aria-label': label, type}) => {
			// TODO: These static values will need to be localized
			return label || type === 'searching' ? 'Searching' : 'Loading';
		},
		className: ({styler, type}) => styler.append(type),
		spinnerNodes: ({styler, type}) => {
			return Array.from({length: type === 'searching' ? 12 : 4}, (_, index) => (
				<span className={styler.join('node', `node${index + 1}`)} key={`node${index}`} />
			));
		}
	},

	render: ({css, spinnerNodes, ...rest}) => {
		delete rest.type;

		return (
			<div aria-live="off" role="alert" {...rest}>
				<div className={css.bg}>
					{spinnerNodes}
				</div>
			</div>
		);
	}
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
		 * The color of the component.
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
		 * * `spinner` - The root component class, unless there is a scrim. The scrim and floating
		 *   layer can be a sibling or parent to this root "spinner" element.
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The size of the component.
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
		color: 'light',
		size: 'medium',
		transparent: false
	},

	styles: {
		css: componentCss,
		publicClassNames: ['spinner']
	},

	computed: {
		className: ({children, color, size, transparent, styler}) => styler.append(
			color,
			size,
			{content: !!children, transparent}
		)
	},

	render: ({css, ...rest}) => {
		delete rest.transparent;

		return (
			<UiSpinnerBase
				{...rest}
				css={css}
				component={SpinnerCore}
			/>
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
 * An Agate-styled Spinner.
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
