/**
 * Agate styled Dropdown.
 *
 * @example
 * <Dropdown
 * 	defaultSelected={2}
 * 	title="Dropdown"
 * >
 * 	{['Option 1', 'Option 2', 'Option 3', 'Option 4']}
 * </Dropdown>
 *
 * @module agate/Dropdown
 * @exports Dropdown
 * @exports DropdownBase
 * @exports DropdownDecorator
 */
import {forward, forProp, handle} from '@enact/core/handle';
import EnactPropTypes from '@enact/core/internal/prop-types';
import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import ForwardRef from '@enact/ui/ForwardRef';
import IdProvider from '@enact/ui/internal/IdProvider';
import Toggleable from '@enact/ui/Toggleable';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import not from 'ramda/src/not';
import React from 'react';
import warning from 'warning';

import Button from '../Button';
import ContextualPopupDecorator from '../ContextualPopupDecorator';
import Icon from '../Icon';
import Item from '../Item';
import Skinnable from '../Skinnable';

import DropdownList from './DropdownList';
import componentCss from './Dropdown.module.less';

const isSelectedValid = ({children, selected}) => Array.isArray(children) && children[selected] != null;

/**
 * A stateless Dropdown Button component.
 *
 * @class DropdownButtonBase
 * @memberof agate/Dropdown
 * @ui
 * @public
 */
const DropdownButtonBase = kind({
	name: 'DropdownButtonBase',

	propTypes: /** @lends agate/Dropdown.DropdownButtonBase.prototype */ {
		/**
		 * Shows if the dropdown is opened.
		 *
		 * @type {Boolean}
		 * @public
		 */
		dropdownOpened: PropTypes.bool,

		/**
		 * Forwards a reference to the this component.
		 *
		 * @type {Object|Function}
		 * @private
		 */
		forwardRef: EnactPropTypes.ref,

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @public
		 */
		skin: PropTypes.string
	},

	render: ({children, dropdownOpened, forwardRef, skin, ...rest}) => {
		return (
			(skin === 'silicon') ?
				<Button
					{...rest}
					icon={dropdownOpened ? 'arrowlargeup' : 'arrowlargedown'}
					iconPosition="after"
					minWidth
					ref={forwardRef}
				>
					{children}
				</Button> :
				<Item
					{...rest}
					ref={forwardRef}
				>
					{children}
					<Icon slot="slotAfter" key="icon" size="small">{dropdownOpened ? 'arrowlargeup' : 'arrowlargedown'}</Icon>
				</Item>
		);
	}
});

const DropdownButton = ContextualPopupDecorator(
	{noArrow: true},
	ForwardRef(
		DropdownButtonBase
	)
);
DropdownButton.displayName = 'DropdownButton';

/**
 * A stateless Dropdown component.
 *
 * @class DropdownBase
 * @memberof agate/Dropdown
 * @ui
 * @public
 */
const DropdownBase = kind({
	name: 'Dropdown',

	propTypes: /** @lends agate/Dropdown.DropdownBase.prototype */ {
		/**
		 * The "aria-label" for the Dropdown.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * The selections for Dropdown
		 *
		 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
		 * @public
		 */
		children: PropTypes.array,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * @type {Object}
		 * @private
		 */
		css: PropTypes.object,

		/**
		 * This is passed onto the wrapped component to allow
		 * it to customize the spotlight container for its use case.
		 *
		 * @type {String}
		 * @private
		 */
		'data-spotlight-id': PropTypes.string,

		/**
		 * Placement of the Dropdown.
		 *
		 * @type {('above'|'below')}
		 * @default 'below'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'below']),

		/**
		 * Disables Dropdown and becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

		/**
		 * The `id` of Dropdown referred to when generating id for `'title'`.
		 *
		 * @type {String}
		 * @private
		 */
		id: PropTypes.string,

		/**
		 * Called when the Dropdown is closing.
		 *
		 * @type {Function}
		 * @public
		 */
		onClose: PropTypes.func,

		/**
		 * Called when the Dropdown is opening.
		 *
		 * @type {Function}
		 * @public
		 */
		onOpen: PropTypes.func,

		/**
		 * Called when an item is selected.
		 *
		 * The event payload will be an object with the following members:
		 * * `data` - The value for the option as received in the `children` prop
		 * * `selected` - Number representing the selected option, 0 indexed
		 *
		 * @type {Function}
		 * @public
		 */
		onSelect: PropTypes.func,

		/**
		 * Displays the items.
		 *
		 * @type {Boolean}
		 * @public
		 */
		open: PropTypes.bool,

		/**
		 * Indicates the locale's text direction is right-to-left.
		 *
		 * @type {Boolean}
		 * @private
		 */
		rtl: PropTypes.bool,

		/**
		 * Index of the selected item.
		 *
		 * @type {Number}
		 * @public
		 */
		selected: PropTypes.number,

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @public
		 */
		skin: PropTypes.string,

		/**
		 * Text displayed in the Dropdown when nothing is selected.
		 *
		 * The title will be replaced with the selected item, if set.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Width of the Dropdown.
		 *
		 * @type {('smallest'|'small'|'medium'|'large'|'x-large'|'huge')}
		 * @default 'medium'
		 * @public
		 */
		width: PropTypes.oneOf(['smallest', 'small', 'medium', 'large', 'x-large', 'huge'])
	},

	defaultProps: {
		direction: 'below',
		width: 'medium'
	},

	handlers: {
		onSelect: handle(
			forward('onSelect'),
			forward('onClose')
		),
		onOpen: handle(
			forward('onClick'),
			not(forProp('disabled', true)),
			not(forProp('open', true)),
			forward('onOpen')
		)
	},

	styles: {
		css: componentCss,
		className: 'dropdown',
		publicClassNames: true
	},

	computed: {
		ariaLabelledBy: ({id, title}) => (title ? `${id}_title` : void 0),
		buttonClassName: ({open, styler}) => styler.append({open}),
		children: ({children, selected}) => {
			if (!Array.isArray(children)) return [];

			return children.map((child, i) => {
				const aria = {
					role: 'checkbox',
					'aria-checked': selected === i
				};

				warning(
					child != null,
					`Unsupported null or undefined child provided at index ${i} which will not be visible when rendered.`
				);

				if (typeof child === 'string') {
					return {
						...aria,
						children: child,
						key: `item_${child}`
					};
				}

				return {
					...aria,
					...child
				};
			});
		},
		className: ({css, direction, width, title, skin, styler}) => styler.append(`${width}Width`, {hasTitle: Boolean(title)}, skin === 'silicon' ? classnames(css.dropdownButton, {[css.upDropdownButton]: direction === 'above'}) : {}),
		direction: ({direction}) => `${direction} center`,
		hasChildren: ({children}) => {
			return children.length > 0;
		},
		title: ({children, selected, title}) => {
			if (isSelectedValid({children, selected})) {
				const child = children[selected];
				return typeof child === 'object' ? child.children : child;
			}

			return title;
		}
	},

	render: ({'aria-label': ariaLabel, ariaLabelledBy, buttonClassName, children, css, direction, disabled, hasChildren, onClose, onOpen, onSelect, open, selected, skin, title, width, ...rest}) => {
		delete rest.rtl;

		const ariaProps = extractAriaProps(rest);
		const calcAriaProps = ariaLabel != null ? null : {role: 'region', 'aria-labelledby': ariaLabelledBy};

		const popupProps = {'aria-live': null, children, direction, disabled, onSelect, open, selected, skin, skinVariants: skin === 'silicon' ? {'night': false} : {}, width, role: null};

		// `ui/Group`/`ui/Repeater` will throw an error if empty so we disable the Dropdown and
		// prevent Dropdown to open if there are no children.
		const openDropdown = hasChildren && !disabled && open;

		return (
			<div {...calcAriaProps} {...rest}>
				<DropdownButton
					aria-label={ariaLabel}
					className={buttonClassName}
					css={css}
					direction={direction}
					disabled={hasChildren ? disabled : true}
					dropdownOpened={openDropdown}
					onClick={onOpen}
					onClose={onClose}
					open={openDropdown}
					popupComponent={DropdownList}
					popupProps={popupProps}
					role="button"
					skin={skin}
					{...ariaProps}

				>
					{title}
				</DropdownButton>
			</div>
		);
	}
});

/**
 * Applies Agate specific behaviors and functionality to
 * [DropdownBase]{@link agate/Dropdown.DropdownBase}.
 *
 * @hoc
 * @memberof sandstone/Dropdown
 * @mixes ui/Changeable.Changeable
 * @mixes ui/Toggleable.Toggleable
 * @mixes spotlight/SpotlightContainerDecorator.SpotlightContainerDecorator
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const DropdownDecorator = compose(
	SpotlightContainerDecorator({
		enterTo: 'default-element',
		preserveId: true
	}),
	I18nContextDecorator({
		rtlProp: 'rtl'
	}),
	IdProvider({
		generateProp: null,
		prefix: 'd_'
	}),
	Changeable({change: 'onSelect', prop: 'selected'}),
	Toggleable({
		activate: 'onOpen',
		deactivate: 'onClose',
		prop: 'open',
		toggle: null
	}),
	Skinnable({prop: 'skin'})
);

/**
 * An Agate Dropdown component.
 *
 * By default, `Dropdown` maintains the state of its `selected` property. Supply the
 * `defaultSelected` property to control its initial value. If you wish to directly control updates
 * to the component, supply a value to `selected` at creation time and update it in response to
 * `onSelect` events.
 *
 * @class Dropdown
 * @memberof agate/Dropdown
 * @extends agate/Dropdown.DropdownBase
 * @mixes agate/Dropdown.DropdownDecorator
 * @ui
 * @public
 */
const Dropdown = DropdownDecorator(DropdownBase);

export default Dropdown;
export {
	Dropdown,
	DropdownBase,
	DropdownDecorator
};
