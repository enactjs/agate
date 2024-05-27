import EnactPropTypes from '@enact/core/internal/prop-types';
import classnames from 'classnames';
import PropTypes from 'prop-types';

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
const ScrollButton = ({active, 'aria-label': ariaLabel, className, ref, ...rest}) => {
	const calculateAriaLabel = () => {
		return (active ? null : ariaLabel);
	};

	return (
		<Button
			{...rest}
			aria-label={calculateAriaLabel()}
			backgroundOpacity="transparent"
			className={classnames(className, css.scrollButton)}
			css={css}
			ref={ref}
			size="small"
		/>
	);
};

ScrollButton.displayName = 'ScrollButton';

ScrollButton.propTypes = /** @lends agate/useScroll.ScrollButton.prototype */ {
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
	 * Returns a ref to the root node of the component
	 *
	 * @type {Component}
	 * @private
	 */
	ref: EnactPropTypes.component
};

export default ScrollButton;
export {
	ScrollButton
};
