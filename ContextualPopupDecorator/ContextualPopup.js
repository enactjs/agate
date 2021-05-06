import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import $L from '../internal/$L';
import Button from '../Button';
import Skinnable from '../Skinnable';

import componentCss from './ContextualPopup.module.less';

/**
 * An SVG arrow for {@link agate/ContextualPopupDecorator.ContextualPopup}.
 *
 * @class ContextualPopupArrow
 * @memberof agate/ContextualPopupDecorator
 * @ui
 * @private
 */
const ContextualPopupArrow = kind({
	name: 'ContextualPopupArrow',

	propTypes: /** @lends agate/ContextualPopupDecorator.ContextualPopupArrow.prototype */ {
		/**
		 * Direction of ContextualPopupArrow.
		 *
		 * @type {('above'|'below'|'left'|'right')}
		 * @default 'below'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'below', 'left', 'right'])
	},

	defaultProps: {
		direction: 'below'
	},

	styles: {
		css: componentCss,
		className: 'arrow'
	},

	computed: {
		className: ({direction, styler}) => styler.append(direction, componentCss.arrow)
	},

	render: (props) => (
		<svg {...props} viewBox="0 0 30 30">
			<path d="M15 2 L0 20 L30 20 Z" className={componentCss.arrowFill} />
		</svg>
	)
});

const ContextualPopupRoot = Skinnable('div');


/**
 * A popup component used by
 * [ContextualPopupDecorator]{@link agate/ContextualPopupDecorator.ContextualPopupDecorator} to
 * wrap its [popupComponent]{@link agate/ContextualPopupDecorator.ContextualPopupDecorator.popupComponent}.
 *
 * `ContextualPopup` is usually not used directly but is made available for unique application use
 * cases.
 *
 * @class ContextualPopup
 * @memberof agate/ContextualPopupDecorator
 * @ui
 * @public
 */
const ContextualPopupBase = kind({
	name: 'ContextualPopup',

	propTypes: /** @lends agate/ContextualPopupDecorator.ContextualPopup.prototype */ {
		/**
		 * The contents of the popup.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Style object for arrow position.
		 *
		 * @type {Object}
		 * @public
		 */
		arrowPosition: PropTypes.shape({
			bottom: PropTypes.number,
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number
		}),

		/**
		 * Style object for container position.
		 *
		 * @type {Object}
		 * @public
		 */
		containerPosition: PropTypes.shape({
			bottom: PropTypes.number,
			left: PropTypes.number,
			right: PropTypes.number,
			top: PropTypes.number
		}),

		/**
		 * Called with the reference to the container node.
		 *
		 * @type {Object|Function}
		 * @public
		 */
		containerRef: EnactPropTypes.ref,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `contextualPopup` - The root class name
		 * * `container` - Applied to the container
		 * * `arrow` - Applied to the arrow
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Direction of ContextualPopup.
		 *
		 * @type {('above'|'above center'|'above left'|'above right'|'below'|'below center'|'below left'|'below right'|'left middle'|'left top'|'left bottom'|'right middle'|'right top'|'right bottom')}
		 * @default 'below center'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'above center', 'above left', 'above right', 'below', 'below center', 'below left', 'below right', 'left middle', 'left top', 'left bottom', 'right middle', 'right top', 'right bottom']),

		/**
		 * Hides the arrow.
		 *
		 * @type {Boolean}
		 * @public
		 */
		noArrow: PropTypes.bool,

		/**
		 * Offset from the activator to apply to the position of the popup.
		 *
		 * @type {('none'|'overlap'|'small')}
		 * @default 'small'
		 * @public
		 */
		offset: PropTypes.oneOf(['none', 'overlap', 'small']),

		/**
		 * Called when the close button is clicked.
		 *
		 * @type {Function}
		 * @public
		 */
		onCloseButtonClick: PropTypes.func,

		/**
		 * Shows the close button.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		showCloseButton: PropTypes.bool
	},

	defaultProps: {
		direction: 'below center',
		offset: 'small',
		showCloseButton: false
	},

	styles: {
		css: componentCss,
		className: 'container',
		publicClassNames: true
	},

	computed: {
		arrowDirection: ({direction}) => {
			const [arrowDirection] = direction.split(' ');
			return arrowDirection;
		},
		className: ({direction, offset, showCloseButton, styler}) => styler.append(
			{
				fixedSize: direction === 'above' || direction === 'below'
			},
			direction.split(' '),
			{reserveClose: showCloseButton},
			offset
		),
		closeButton: ({css, showCloseButton, onCloseButtonClick}) => {
			if (showCloseButton) {
				return (
					<Button
						aria-label={$L('Close')}
						backgroundOpacity="transparent"
						className={css.closeButton}
						css={css}
						icon="closex"
						onTap={onCloseButtonClick}
						size="small"
					/>
				);
			}
		}
	},

	render: ({arrowDirection, arrowPosition, children, className, closeButton, containerPosition, containerRef, css, noArrow, ...rest}) => {
		delete rest.direction;
		delete rest.offset;
		delete rest.onCloseButtonClick;
		delete rest.showCloseButton;

		return (
			<ContextualPopupRoot aria-live="off" role="alert" {...rest} className={css.contextualPopup}>
				<div className={className} style={containerPosition} ref={containerRef}>
					{children}
					{closeButton}
				</div>
				{noArrow ?
					null :
					<ContextualPopupArrow direction={arrowDirection} style={arrowPosition} />
				}
			</ContextualPopupRoot>
		);
	}
});

export default ContextualPopupBase;
export {
	ContextualPopupBase as ContextualPopup,
	ContextualPopupBase
};
