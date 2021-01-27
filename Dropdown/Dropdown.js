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
import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import IdProvider from '@enact/ui/internal/IdProvider';
import ri from '@enact/ui/resolution';
import Toggleable from '@enact/ui/Toggleable';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Button from '../Button';
import Item from '../Item';
import RadioItem from '../RadioItem';
import Skinnable from '../Skinnable';
import {compareChildren} from './DropdownList';
import componentCss from './Dropdown.module.less';
import ContextualPopupDecorator from '../ContextualPopupDecorator';
import ForwardRef from '@enact/ui/ForwardRef';
import EnactPropTypes from '@enact/core/internal/prop-types';
import DropdownList from './DropdownList';
import not from 'ramda/src/not';
import warning from 'warning';
import Pure from '@enact/ui/internal/Pure';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';

const isSelectedValid = ({children, selected}) => Array.isArray(children) && children[selected] != null;

const DropdownButtonBase = kind({
	name: 'DropdownButtonBase',

	propTypes: {
		forwardRef: EnactPropTypes.ref,

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @public
		 */
		skin: PropTypes.string
	},

	render: ({children, css, forwardRef, opened, skin, ...rest}) => {
		return (	(skin === 'silicon') ?
			<Button
				role="button"
				{...rest}
				css={css}
				ref={forwardRef}
				icon={opened ? 'arrowlargeup' : 'arrowlargedown'}
				iconPosition="after"
				minWidth
			>
				{children}
			</Button> :
			<Item
				role="button"
				{...rest}
				css={componentCss}
				ref={forwardRef}
			>
				{children}
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

		// 		/**
		// 		 * The direction where the dropdown list appears.
		// 		 *
		// 		 * @type {('left'|'right'|'down'|'up')}
		// 		 * @default 'down'
		// 		 * @public
		// 		 */
		// 		direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),

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
		 * @default false
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
		 * The size of the Dropdown's [Button]{@link sandstone/Button.Button} component.
		 *
		 * @type {('large'|'small')}
		 * @default 'small'
		 * @public
		 */
		size: PropTypes.oneOf(['large', 'small']),

		/**
		 * The current skin for this component.
		 *
		 * @type {String}
		 * @public
		 */
		skin: PropTypes.string,

		/**
		 * The primary title text of Dropdown.
		 *
		 * The title will be replaced with the selected item, if set.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/** The direction where the dropdown list appears.
		 *
		 * @type {('left'|'right'|'down'|'up')}
		 * @default 'down'
		 * @public
		 */
		transitionDirection: PropTypes.oneOf(['down', 'left', 'right', 'up']),

		/**
		 * Width of the Dropdown.
		 *
		 * @type {('huge'|'large'|'x-large'|'medium'|'small'|'tiny'|'auto')}
		 * @default 'medium'
		 * @public
		 */
		width: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'x-large', 'huge', 'auto'])
	},

	defaultProps: {
		direction: 'below',
		// direction: 'down',
		open: false,
		size: 'small',
		width: 'medium',
		transitionDirection: 'down'
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
		adjustedDirection: ({direction, 'data-spotlight-id': containerId}) => {
			if (typeof window !== 'undefined') {
				const calcOverflow = (container, client, wrapper) => {
					const KEEPOUT = ri.scale(24); // keep out distance on the edge of the screen
					const wrapperTop = (wrapper && wrapper.top) || 0;
					const wrapperBottom = (wrapper && wrapper.bottom) || window.innerHeight;

					const overflow = {
						isOverTop: client.top - container.height - KEEPOUT < wrapperTop,
						isOverBottom: client.bottom + container.height + KEEPOUT > wrapperBottom
					};

					return overflow;
				};

				const adjustDirection = (overflow) => {
					let adjustedDirection = direction;
					if (overflow.isOverTop && !overflow.isOverBottom && direction === 'up') {
						adjustedDirection = 'down';
					} else if (overflow.isOverBottom && !overflow.isOverTop && direction === 'down') {
						adjustedDirection = 'up';
					}

					return adjustedDirection;
				};

				const containerSelector = `[data-spotlight-id='${containerId}']`;
				const containerNode = document.querySelector(`${containerSelector} .${componentCss.dropdownList}`);
				const clientNode = document.querySelector(`${containerSelector} .${componentCss.dropdown}`);
				const wrapperNode = clientNode && clientNode.closest('div[style*=overflow]');

				if (containerNode && clientNode) {
					const containerNodeRect = containerNode.getBoundingClientRect();
					const clientNodeRect = clientNode.getBoundingClientRect();
					const wrapperNodeRect = wrapperNode && wrapperNode.getBoundingClientRect();
					return adjustDirection(calcOverflow(containerNodeRect, clientNodeRect, wrapperNodeRect));
				}
			}

			return direction;
		},
		ariaLabelledBy: ({id, title}) => (title ? `${id}_title` : void 0),
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
		className: ({adjustedDirection, css, width, title, skin, styler}) => styler.append(`${width}Width`, {hasTitle: Boolean(title)}, skin === 'silicon' ? classnames(css.dropdownButton, {[css.upDropdownButton]: adjustedDirection === 'up'}) : {}),
		buttonClassName: ({open, styler}) => styler.append({open}),
		direction: ({direction}) => `${direction} center`,
		title: ({children, selected, title}) => {
			if (isSelectedValid({children, selected})) {
				const child = children[selected];
				return typeof child === 'object' ? child.children : child;
			}

			return title;
		},
		hasChildren: ({children}) => {
			return children.length > 0;
		}
	},

	render: ({adjustedDirection, 'aria-label': ariaLabel, ariaLabelledBy, buttonClassName, children, css, direction, disabled, hasChildren, onClose, onOpen, onSelect, open, selected, size, skin, transitionDirection, title, width, ...rest}) => {
		delete rest.rtl;

		const ariaProps = extractAriaProps(rest);
		const calcAriaProps = ariaLabel != null ? null : {role: 'region', 'aria-labelledby': ariaLabelledBy};

		const groupProps =  (skin === 'silicon') ?
			{childComponent: RadioItem, itemProps: {size: 'small', className: css.dropDownListItem, css}, selectedProp: 'selected'} :
			{childComponent: Item, itemProps: {size: 'small'}};

		const popupProps = {'aria-live': null, children, groupProps, onSelect, selected, skinVariants: skin === 'silicon' ? {'night': false} : {}, transitionDirection, width, role: null};

		// `ui/Group`/`ui/Repeater` will throw an error if empty so we disable the Dropdown and
		// prevent Dropdown to open if there are no children.
		const openDropdown = hasChildren && !disabled && open;

		return (
			<div {...calcAriaProps} {...rest}>
				<DropdownButton
					aria-label={ariaLabel}
					className={buttonClassName}
					direction={direction}
					disabled={hasChildren ? disabled : true}
					icon={openDropdown ? 'arrowlargeup' : 'arrowlargedown'}
					popupProps={popupProps}
					popupComponent={DropdownList}
					onClick={onOpen}
					onClose={onClose}
					open={openDropdown}
					opened={openDropdown}
					size={size}
					skin={skin}
					spotlightRestrict="self-only"
					{...ariaProps}
					css={css}
				>
					{title}
				</DropdownButton>
			</div>
		);
	}
});
// const DropdownBase = kind({
// 	name: 'Dropdown',
//
// 	handlers: {
// 		onSelect: handle(
// 			forward('onSelect'),
// 			forward('onClose'),
// 			handleTransitionHide
// 		),
// 		onOpen: handle(
// 			forProp('open', false),
// 			forward('onOpen')
// 		)
// 	},
//
//
// 	computed: {
// 		dropdownListClassName: ({children, css, styler}) => styler.join(css.dropdownList, {dropdownListWithScroller: children.length > 4}),
// 	},
//
// 	render: ({adjustedDirection, buttonClassName, children, css, dropdownListClassName, disabled, hasChildren, onClose, onOpen, onSelect, open, selected, skin, title, ...rest}) => {
// 		const ariaProps = extractAriaProps(rest);
// 		const dropdownButtonClassName = classnames(css.dropdownButton, {[css.upDropdownButton]: adjustedDirection === 'up'});
// 		const opened = !disabled && open;
// 		const transitionContainerClassName = classnames(css.transitionContainer, {[css.openTransitionContainer]: open, [css.upTransitionContainer]: adjustedDirection === 'up'});
// 		const [DropDownButtonOld, dropDownButtonProps, wrapperProps, skinVariants, groupProps, iconComponent] = (skin === 'silicon') ? [
// 			Button,
// 			{icon: open ? 'arrowlargeup' : 'arrowlargedown', iconPosition: 'after', minWidth: true},
// 			{className: dropdownButtonClassName},
// 			{'night': false},
// 			{childComponent: RadioItem, itemProps: {size: 'small', className: css.dropDownListItem, css}, selectedProp: 'selected'},
// 			[]
// 		] : [
// 			Item,
// 			{},
// 			{},
// 			{},
// 			{childComponent: Item, itemProps: {size: 'small'}},
// 			[<Icon slot="slotAfter" key="icon" className={css.icon} size="small">{open ? 'arrowlargeup' : 'arrowlargedown'}</Icon>]
//
// 		];
//
// 		return (
// 			<div {...rest}>
// 				<div {...wrapperProps}>
// 					<DropdownButton
// 						role="button"
// 						className={buttonClassName}
// 						css={css}
// 						disabled={hasChildren ? disabled : true}
// 						onClick={opened ? onClose : onOpen}
// 						open={open}
// 						// {...dropDownButtonProps}
// 						{...ariaProps}
// 						popupComponent={DropdownList
// 						// 	<Transition
// 						// 	className={transitionContainerClassName}
// 						// 	visible={opened}
// 						// 	direction={oppositeDirection[adjustedDirection]}
// 						// >
// 						// 	<ContainerDiv className={dropdownListClassName} spotlightDisabled={!open} spotlightRestrict="self-only">
// 						// 		<Scroller skinVariants={skinVariants} className={css.scroller}>
// 						// 			<Group
// 						// 				role={null}
// 						// 				className={css.group}
// 						// 				onSelect={onSelect}
// 						// 				selected={selected}
// 						// 				{...groupProps}
// 						// 			>
// 						// 				{children || []}
// 						// 			</Group>
// 						// 		</Scroller>
// 						// 	</ContainerDiv>
// 						// </Transition>
// 						}
// 					>
// 						{iconComponent}
// 						{title}
// 					</DropdownButton>
//
// 				</div>
// 			</div>
// 		);
// 	}
// });

/**
 * Applies Agate specific behaviors to [DropdownBase]{@link agate/Dropdown.DropdownBase}.
 *
 * @hoc
 * @memberof agate/Dropdown
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const DropdownDecorator = compose(
	Pure({
		propComparators: {
			children: compareChildren
		}
	}),
	SpotlightContainerDecorator,
	// SpotlightContainerDecorator({
	// 	enterTo: 'default-element',
	// 	preserveId: true
	// }),
	I18nContextDecorator({
		rtlProp: 'rtl'
	}),
	IdProvider({
		generateProp: null,
		prefix: 'd_'
	}),
	Changeable({change: 'onSelect', prop: 'selected'}),
	// Toggleable({toggle: null, prop: 'open', activate: 'onOpen', deactivate: 'onClose', toggleProp: 'onClick'}),
	Toggleable({
		activate: 'onOpen',
		deactivate: 'onClose',
		prop: 'open',
		toggle: null
	}),

	// DropDownExtended,
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
