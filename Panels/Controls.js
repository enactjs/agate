import kind from '@enact/core/kind';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import ForwardRef from '@enact/ui/ForwardRef';
import PropTypes from 'prop-types';
import React from 'react';

import ApplicationCloseButton from './ApplicationCloseButton';

import css from './Panels.module.less';

/**
 * Group of controls shared across Panel instances
 *
 * @class ControlsBase
 * @memberof agate/Panels
 * @ui
 * @private
 */
const ControlsBase = kind({
	name: 'Controls',

	propTypes: /** @lends agate/Panels.ControlsBase.prototype */ {
		/**
		 * Additional controls displayed before the close button.
		 *
		 * @type {Node}
		 * @public
		 */
		children: PropTypes.node,

		/**
		 * Sets the hint string read when focusing the application close button.
		 *
		 * @type {String}
		 * @public
		 */
		closeButtonAriaLabel: PropTypes.string,

		/**
		 * Called with a reference to the root DOM node of this component.
		 *
		 * @type {Function|Object}
		 * @public
		 */
		forwardRef: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.shape({current: PropTypes.any})
		]),

		/**
		 * Indicates the close button will not be rendered on the top right corner.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noCloseButton: PropTypes.bool,

		/**
		 * Called when the app close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onApplicationClose: PropTypes.func
	},

	styles: {
		css,
		className: 'controls'
	},

	render: ({children, closeButtonAriaLabel, forwardRef, noCloseButton, onApplicationClose, ...rest}) => {
		if (!children && noCloseButton) return null;

		return (
			<div {...rest} ref={forwardRef}>
				{children}
				{noCloseButton ? null : (
					<ApplicationCloseButton
						aria-label={closeButtonAriaLabel}
						className={css.close}
						onApplicationClose={onApplicationClose}
					/>
				)}
			</div>
		);
	}
});

/**
 * Group of controls shared across Panel instances.
 *
 * ```
 * // remove the close button and use a star icon button
 * <Controls noCloseButton>
 *   <Button icon="star"></Button>
 * </Controls>
 * ```
 *
 * @class Controls
 * @mixes spotlight/SpotlightContainerDecorator
 * @memberof agate/Panels
 * @ui
 * @private
 */
const Controls = ForwardRef(SpotlightContainerDecorator(ControlsBase));

export default Controls;
export {
	Controls,
	ControlsBase
};
