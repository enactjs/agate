import kind from '@enact/core/kind';
import ForwardRef from '@enact/ui/ForwardRef';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';

import Button from '../Button';

import css from './Scrollbar.module.less';

/**
 * A [Button]{@link agate/Button.Button} used within
 * a [Scrollbar]{@link agate/useScroll.Scrollbar}.
 *
 * @class ScrollButton
 * @memberof agate/useScroll
 * @extends agate/Button.Button
 * @ui
 * @private
 */
const ScrollButtonBase = kind({
	name: 'ScrollButton',

	propTypes: /** @lends agate/useScroll.ScrollButton.prototype */ {
		/**
		 * Name of icon.
		 *
		 * @type {String}
		 * @required
		 * @public
		 */
		icon: PropTypes.string.isRequired,

		/**
		 * Sets the `aria-label`.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		active: PropTypes.bool,

		/**
		 * Sets the hint string read when focusing the scroll bar button.
		 *
		 * @type {String}
		 * @memberof agate/useScroll.ScrollButton.prototype
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * Disables the button.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * Returns a ref to the root node of the scroll button
		 *
		 * See: https://github.com/facebook/prop-types/issues/240
		 *
		 * @type {Function|Object}
		 * @private
		 */
		forwardRef: PropTypes.oneOfType([
			PropTypes.func,
			PropTypes.shape({current: PropTypes.any})
		])
	},

	styles: {
		css,
		className: 'scrollButton'
	},

	handlers: {
		forwardRef: (node, {forwardRef}) => {
			// Allowing findDOMNode in the absence of a means to retrieve a node ref through Button
			// eslint-disable-next-line react/no-find-dom-node
			const current = ReactDOM.findDOMNode(node);

			// Safely handle old ref functions and new ref objects
			switch (typeof forwardRef) {
				case 'object':
					forwardRef.current = current;
					break;
				case 'function':
					forwardRef(current);
					break;
			}
		}
	},

	computed: {
		'aria-label': ({active, 'aria-label': ariaLabel}) => (active ? null : ariaLabel)
	},

	render: ({forwardRef, ...rest}) => {
		delete rest.active;

		return (
			<Button
				{...rest}
				backgroundOpacity="transparent"
				ref={forwardRef}
				size="small"
			/>
		);
	}
});

const ScrollButton = ForwardRef(ScrollButtonBase);

export default ScrollButton;
export {
	ScrollButton
};
