/**
 * Provides Agate-themed indeterminate progress indicator (spinner) components and behaviors.
 *
 * Used for indicating to the user that something is busy and interaction is temporarily suspended.
 *
 * @example
 * <Spinner color="dark" size="small" type="searching" />
 *
 * @module agate/Spinner
 * @exports Spinner
 * @exports SpinnerBase
 * @exports SpinnerDecorator
 */
import kind from '@enact/core/kind';
import Pure from '@enact/ui/internal/Pure';
import UiSpinnerBase from '@enact/ui/Spinner';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import $L from '../internal/$L';
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
		type: PropTypes.oneOf(['loading', 'searching'])
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
			return label || type === 'searching' ? $L('Searching') : $L('Loading');
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
 * @extends ui/Spinner.Spinner
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
		color: PropTypes.oneOf(['dark', 'light']),

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
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
		 * Pauses the animation of the spinner
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		paused: PropTypes.bool,

		/**
		 * The size of the component.
		 *
		 * Recommended usage is "large" (default) for standalone and popup scenarios, while "small"
		 * is best suited for use inside other elements, like {@link agate/Item.Item}.
		 *
		 * @type {('huge'|'large'|'small'|'smallest')}
		 * @default 'large'
		 * @public
		 */
		size: PropTypes.oneOf(['huge', 'large', 'small', 'smallest']),

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
		paused: false,
		size: 'large',
		transparent: false
	},

	styles: {
		css: componentCss,
		publicClassNames: ['spinner']
	},

	computed: {
		className: ({children, color, paused, size, styler, transparent}) => styler.append(
			color,
			size,
			{content: !!children, transparent},
			{pausedAnimation: paused}
		)
	},

	render: ({css, ...rest}) => {
		delete rest.paused;
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
 * Agate-specific Spinner behaviors to apply to [Spinner]{@link agate/Spinner.SpinnerBase}.
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
 * @extends agate/Spinner.SpinnerBase
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
