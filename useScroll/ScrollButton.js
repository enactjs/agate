import {WithRef} from '@enact/core/internal/WithRef';
import kind from '@enact/core/kind';
import ForwardRef from '@enact/ui/ForwardRef';
import PropTypes from 'prop-types';
import {useRef} from "react";

import Button from '../Button';

import css from './Scrollbar.module.less';

const ButtonWithRef = WithRef(Button);

/**
 * A {@link agate/Button.Button|Button} used within
 * a {@link agate/useScroll.Scrollbar|Scrollbar}.
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

	functional: true,

	styles: {
		css,
		className: 'scrollButton'
	},

	computed: {
		'aria-label': ({active, 'aria-label': ariaLabel}) => (active ? null : ariaLabel)
	},

	render: ({forwardRef, ...rest}) => {
		delete rest.active;

		// eslint-disable-next-line react-hooks/rules-of-hooks
		const clientSiblingRef = useRef();

		let calculatedForwardRef = () => {
			// Safely handle old ref functions and new ref objects
			switch (typeof forwardRef) {
				case 'object':
					forwardRef.current = clientSiblingRef.current;
					break;
				case 'function':
					forwardRef(clientSiblingRef.current);
					break;
			}
		};

		return (
			<ButtonWithRef
				{...rest}
				backgroundOpacity="transparent"
				css={css}
				outermostRef={clientSiblingRef}
				ref={calculatedForwardRef}
				referrerName="Button"
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
