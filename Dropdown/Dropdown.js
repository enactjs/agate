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
import {on, off} from '@enact/core/dispatcher';
import {forKey, forward, forProp, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {add} from '@enact/core/keymap';
import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import IdProvider from '@enact/ui/internal/IdProvider';
import ri from '@enact/ui/resolution';
import Toggleable from '@enact/ui/Toggleable';
import Transition from '@enact/ui/Transition';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import ReactDOM from 'react-dom';

import Button from '../Button';
import Icon from '../Icon';
import Item from '../Item';
import RadioItem from '../RadioItem';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';
import {compareChildren} from './DropdownList'
import componentCss from './Dropdown.module.less';
import ContextualPopupDecorator from "../ContextualPopupDecorator";
import ForwardRef from "@enact/ui/ForwardRef";
import EnactPropTypes from "@enact/core/internal/prop-types";
import DropdownList from "./DropdownList";
import not from "ramda/src/not";
import Heading from "../Heading";
import $L from "../internal/$L";
import warning from "warning";
import Pure from "@enact/ui/internal/Pure";
import {I18nContextDecorator} from "@enact/i18n/I18nDecorator";

const oppositeDirection = {left: 'right', right: 'left', up: 'down', down: 'up'};
const ContainerDiv = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');
const isSelectedValid = ({children, selected}) => Array.isArray(children) && children[selected] != null;

const handleTransitionHide = (ev, {'data-spotlight-id': containerId}) => {
	const containerSelector = `[data-spotlight-id='${containerId}']`;
	const current = Spotlight.getCurrent();

	if (!Spotlight.isPaused() && current && document.querySelector(`${containerSelector} .${componentCss.dropdownList}`).contains(current)) {
		const focusResult = Spotlight.focus(`${containerSelector} .${componentCss.dropdown}`);
		if (!focusResult && Spotlight.getPointerMode()) {
			document.querySelector(`${containerSelector} .${componentCss.dropdown}`).focus();
		}
	}
};

// Add keymap for escape key
add('cancel', 27);


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

	render: ({children, forwardRef, skin, ...rest}) => {
		console.log(children);
	return (	(skin === 'silicon') ?
			<Button
			{...rest}
			css={componentCss}
			ref={forwardRef}
		//	iconPosition="after"
				icon={rest.open ? 'arrowlargeup' : 'arrowlargedown'}
				iconPosition="after"
				minWidth={true}
			>
				{children}
			</Button> :
			<Item
				{...rest}
				css={componentCss}
				ref={forwardRef}
			>
				{children}
			</Item>
	)}
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

	propTypes: /** @lends sandstone/Dropdown.DropdownBase.prototype */ {
		/**
		 * The "aria-label" for the Dropdown.
		 *
		 * @type {String}
		 * @public
		 */
		'aria-label': PropTypes.string,

		/**
		 * Items to be displayed in the `Dropdown` when `open`.
		 *
		 * Takes either an array of strings or an array of objects. When strings, the values will be
		 * used in the generated components as the readable text. When objects, the properties will
		 * be passed onto an `Item` component; `children` as well as a unique `key` properties are
		 * required.
		 *
		 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
		 * @public
		 */
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.shape({
				children: EnactPropTypes.renderable.isRequired,
				key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
			}))
		]),

		/**
		 * Placement of the Dropdown.
		 *
		 * @type {('above'|'below')}
		 * @default 'below'
		 * @public
		 */
		direction: PropTypes.oneOf(['above', 'below']),

		/**
		 * Disables Dropdown, making it non-interactive.
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
		 * Text displayed in the Dropdown when nothing is selected.
		 *
		 * The placeholder will be replaced by the selected item.
		 *
		 * @type {String}
		 * @default 'No Selection'
		 * @public
		 */
		placeholder: PropTypes.string,

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
		 * Primary title text of the Dropdown.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string,

		/**
		 * Width of the Dropdown.
		 *
		 * @type {('huge'|'large'|'x-large'|'medium'|'small'|'tiny')}
		 * @default 'medium'
		 * @public
		 */
		width: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'x-large', 'huge'])
	},

	defaultProps: {
		direction: 'below',
		open: false,
		size: 'small',
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
		className: 'dropdown'
	},

	computed: {
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
		className: ({width, title, styler}) => styler.append(`${width}Width`, {hasTitle: Boolean(title)}),
		direction: ({direction}) => `${direction} center`,
		placeholder: ({children, placeholder = $L('No Selection'), selected}) => {
			if (isSelectedValid({children, selected})) {
				const child = children[selected];
				return typeof child === 'object' ? child.children : child;
			}

			return placeholder;
		},
		title: ({id, title}) => (title &&
			<Heading
				className={componentCss.title}
				id={`${id}_title`}
				size="tiny"
			>
				{title}
			</Heading>
		)
	},

	render: ({'aria-label': ariaLabel, ariaLabelledBy, children, direction, disabled, onClose, onOpen, onSelect, open, placeholder, selected, size, skin, title, width, ...rest}) => {
		delete rest.rtl;

		const ariaProps = extractAriaProps(rest);
		const calcAriaProps = ariaLabel != null ? null : {role: 'region', 'aria-labelledby': ariaLabelledBy};

		const groupProps =  (skin === 'silicon') ?
			{childComponent: RadioItem, itemProps: {size: 'small', className: css.dropDownListItem, css}, selectedProp: 'selected'} :
			{childComponent: Item, itemProps: {size: 'small'}}

		const popupProps = {'aria-live': null, children, groupProps, onSelect, selected, width, role: null};

		// `ui/Group`/`ui/Repeater` will throw an error if empty so we disable the Dropdown and
		// prevent Dropdown to open if there are no children.
		const hasChildren = children.length > 0;
		const openDropdown = hasChildren && !disabled && open;




		return (
			<div {...calcAriaProps} {...rest}>
				{title}
				<DropdownButton
					aria-label={ariaLabel}
					direction={direction}
					disabled={hasChildren ? disabled : true}
					icon={openDropdown ? 'arrowlargeup' : 'arrowlargedown'}
					popupProps={popupProps}
					popupComponent={DropdownList}
					onClick={onOpen}
					onClose={onClose}
					open={openDropdown}
					size={size}
					spotlightRestrict="self-only"
					{...ariaProps}
				>
					{placeholder}
				</DropdownButton>
			</div>
		);
	}
});
// const DropdownBase = kind({
// 	name: 'Dropdown',
//
// 	propTypes: /** @lends agate/Dropdown.DropdownBase.prototype */ {
// 		/**
// 		 * The selections for Dropdown
// 		 *
// 		 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
// 		 * @public
// 		 */
// 		children: PropTypes.array,
//
// 		/**
// 		 * Customizes the component by mapping the supplied collection of CSS class names to the
// 		 * corresponding internal elements and states of this component.
// 		 *
// 		 * @type {Object}
// 		 * @private
// 		 */
// 		css: PropTypes.object,
//
// 		/**
// 		 * This is passed onto the wrapped component to allow
// 		 * it to customize the spotlight container for its use case.
// 		 *
// 		 * @type {String}
// 		 * @private
// 		 */
// 		'data-spotlight-id': PropTypes.string,
//
// 		/**
// 		 * The direction where the dropdown list appears.
// 		 *
// 		 * @type {('left'|'right'|'down'|'up')}
// 		 * @default 'down'
// 		 * @public
// 		 */
// 		direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),
//
// 		/**
// 		 * Disables Dropdown and becomes non-interactive.
// 		 *
// 		 * @type {Boolean}
// 		 * @public
// 		 */
// 		disabled: PropTypes.bool,
//
// 		/**
// 		 * Called when the Dropdown is closing.
// 		 *
// 		 * @type {Function}
// 		 * @public
// 		 */
// 		onClose: PropTypes.func,
//
// 		/**
// 		 * Called when the Dropdown is opening.
// 		 *
// 		 * @type {Function}
// 		 * @public
// 		 */
// 		onOpen: PropTypes.func,
//
// 		/**
// 		 * Called when an item is selected.
// 		 *
// 		 * @type {Function}
// 		 * @public
// 		 */
// 		onSelect: PropTypes.func,
//
// 		/**
// 		 * Displays the items.
// 		 *
// 		 * @type {Boolean}
// 		 * @default false
// 		 * @public
// 		 */
// 		open: PropTypes.bool,
//
// 		/**
// 		 * Index of the selected item.
// 		 *
// 		 * @type {Number}
// 		 * @public
// 		 */
// 		selected: PropTypes.number,
//
// 		/**
// 		 * The current skin for this component.
// 		 *
// 		 * @type {String}
// 		 * @public
// 		 */
// 		skin: PropTypes.string,
//
// 		/**
// 		 * The primary title text of Dropdown.
// 		 *
// 		 * The title will be replaced with the selected item, if set.
// 		 *
// 		 * @type {String}
// 		 * @public
// 		 */
// 		title: PropTypes.string
// 	},
//
// 	defaultProps: {
// 		direction: 'down',
// 		open: false
// 	},
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
// 	styles: {
// 		css: componentCss,
// 		className: 'dropdown',
// 		publicClassNames: true
// 	},
//
// 	computed: {
// 		adjustedDirection: ({direction, 'data-spotlight-id': containerId}) => {
// 			if (typeof window !== 'undefined') {
// 				const calcOverflow = (container, client, wrapper) => {
// 					const KEEPOUT = ri.scale(24); // keep out distance on the edge of the screen
// 					const wrapperTop = (wrapper && wrapper.top) || 0;
// 					const wrapperBottom = (wrapper && wrapper.bottom) || window.innerHeight;
//
// 					const overflow = {
// 						isOverTop: client.top - container.height - KEEPOUT < wrapperTop,
// 						isOverBottom: client.bottom + container.height + KEEPOUT > wrapperBottom
// 					};
//
// 					return overflow;
// 				};
//
// 				const adjustDirection = (overflow) => {
// 					let adjustedDirection = direction;
// 					if (overflow.isOverTop && !overflow.isOverBottom && direction === 'up') {
// 						adjustedDirection = 'down';
// 					} else if (overflow.isOverBottom && !overflow.isOverTop && direction === 'down') {
// 						adjustedDirection = 'up';
// 					}
//
// 					return adjustedDirection;
// 				};
//
// 				const containerSelector = `[data-spotlight-id='${containerId}']`;
// 				const containerNode = document.querySelector(`${containerSelector} .${componentCss.dropdownList}`);
// 				const clientNode = document.querySelector(`${containerSelector} .${componentCss.dropdown}`);
// 				const wrapperNode = clientNode && clientNode.closest('div[style*=overflow]');
//
// 				if (containerNode && clientNode) {
// 					const containerNodeRect = containerNode.getBoundingClientRect();
// 					const clientNodeRect = clientNode.getBoundingClientRect();
// 					const wrapperNodeRect = wrapperNode && wrapperNode.getBoundingClientRect();
// 					return adjustDirection(calcOverflow(containerNodeRect, clientNodeRect, wrapperNodeRect));
// 				}
// 			}
//
// 			return direction;
// 		},
// 		buttonClassName: ({open, styler}) => styler.append({open}),
// 		children: ({children, selected}) => {
// 			if (!Array.isArray(children)) return [];
//
// 			return children.map((child, i) => {
// 				const aria = {
// 					role: 'checkbox',
// 					'aria-checked': selected === i
// 				};
//
// 				if (typeof child === 'string') {
// 					return {
// 						...aria,
// 						children: child,
// 						key: `item_${child}`
// 					};
// 				}
//
// 				return {
// 					...aria,
// 					...child
// 				};
// 			});
// 		},
// 		dropdownListClassName: ({children, css, styler}) => styler.join(css.dropdownList, {dropdownListWithScroller: children.length > 4}),
// 		title: ({children, selected, title}) => {
// 			if (isSelectedValid({children, selected})) {
// 				const child = children[selected];
// 				return typeof child === 'object' ? child.children : child;
// 			}
//
// 			return title;
// 		},
// 		hasChildren: ({children}) => {
// 			return children.length > 0;
// 		}
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

const DropDownExtended = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'DropDownExtended';

		static propTypes = {
			open: PropTypes.bool
		};

		constructor (props) {
			super(props);
		}

		componentDidMount () {
			// eslint-disable-next-line react/no-find-dom-node
			this.node = ReactDOM.findDOMNode(this);

			if (this.props.open) {
				on('click', this.handleClick);
				on('keydown', this.handleKeyDown);
			}
		}

		componentDidUpdate (prevProps) {
			const {open} = this.props;

			if (!prevProps.open && open) {
				on('click', this.handleClick);
				on('keydown', this.handleKeyDown);
			} else if (prevProps.open && !open) {
				off('click', this.handleClick);
				off('keydown', this.handleKeyDown);
			}
		}

		componentWillUnmount () {
			off('click', this.handleClick);
			off('keydown', this.handleKeyDown);
		}

		clickedOutsideDropdown = ({target}) => !this.node.contains(target);

		// If a click happened outside the component area close the dropdown by forwarding the onClick from Toggleable.
		handleClick = handle(
			this.clickedOutsideDropdown,
			forward('onClick')
		).bindAs(this, 'handleClick');

		handleKeyDown = handle(
			forKey('cancel'),
			forward('onClick')
		).bindAs(this, 'handleKeyDown');

		render () {
			return (
				<Wrapped {...this.props} />
			);
		}
	};
});

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
	//Toggleable({toggle: null, prop: 'open', activate: 'onOpen', deactivate: 'onClose', toggleProp: 'onClick'}),
	Toggleable({
		activate: 'onOpen',
		deactivate: 'onClose',
		prop: 'open',
		toggle: null
	}),

	//DropDownExtended,
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
