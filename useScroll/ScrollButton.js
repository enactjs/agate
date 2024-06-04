import {WithRef} from '@enact/core/internal/WithRef';
import ForwardRef from '@enact/ui/ForwardRef';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {useEffect, useRef} from 'react';

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
const ScrollButtonBase = ({active, 'aria-label': ariaLabel, className, forwardRef, ...rest}) => {
	const clientSiblingRef = useRef();
	const ButtonWithRef = WithRef(Button);

	const calculateAriaLabel = () => {
		return (active ? null : ariaLabel);
	};

	useEffect(() => {
		const current = clientSiblingRef.current;

		// Safely handle old ref functions and new ref objects
		switch (typeof forwardRef) {
			case 'object':
				forwardRef.current = current;
				break;
			case 'function':
				forwardRef(current);
				break;
		}
	}, [forwardRef]);

	return (
		<ButtonWithRef
			{...rest}
			aria-label={calculateAriaLabel()}
			backgroundOpacity="transparent"
			className={classnames(className, css.scrollButton)}
			css={css}
			outermostRef={clientSiblingRef}
			ref={forwardRef}
			referrerName="Button"
			size="small"
		/>
	);
};

ScrollButtonBase.displayName = 'ScrollButton';

ScrollButtonBase.propTypes = /** @lends agate/useScroll.ScrollButton.prototype */ {
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
};

const ScrollButton = ForwardRef(ScrollButtonBase);

export default ScrollButton;
export {
	ScrollButton
};
