import {getFragmentHostNode} from '@enact/core/internal/fragmentHost';
import kind from '@enact/core/kind';
import ForwardRef from '@enact/ui/ForwardRef';
import PropTypes from 'prop-types';
import {Fragment, useRef} from 'react';

import Button from '../Button';

import css from './Scrollbar.module.less';

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

		let calculatedForwardRef = (node) => {
			// The fragment ref is the wrapped host. Spotlight still needs that element.
			const host = getFragmentHostNode(clientSiblingRef.current) || node;

			// Safely handle old ref functions and new ref objects
			switch (typeof forwardRef) {
				case 'object':
					forwardRef.current = host;
					break;
				case 'function':
					forwardRef(host);
					break;
			}
		};

		return (
			<Fragment ref={clientSiblingRef}>
				<Button
					{...rest}
					backgroundOpacity="transparent"
					css={css}
					ref={calculatedForwardRef}
					size="small"
				/>
			</Fragment>
		);
	}
});

const ScrollButton = ForwardRef(ScrollButtonBase);

export default ScrollButton;
export {
	ScrollButton
};
