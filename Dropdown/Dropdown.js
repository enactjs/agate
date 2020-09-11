/**
 * Agate styled Dropdown.
 *
 * @example
 * <Dropdown
 * 		defaultSelected={2}
 *		title="Dropdown"
 * >
 *   {['Option 1', 'Option 2', 'Option 3', 'Option 4']}
 * </Dropdown>
 *
 * @module agate/Dropdown
 * @exports Dropdown
 * @exports DropdownBase
 * @exports DropdownDecorator
 */
import {on, off} from '@enact/core/dispatcher';
import {handle, forward, forProp} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import {extractAriaProps} from '@enact/core/util';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import {MarqueeDecorator} from '@enact/ui/Marquee';
import IdProvider from '@enact/ui/internal/IdProvider';
import Toggleable from '@enact/ui/Toggleable';
import Transition from '@enact/ui/Transition';
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

import componentCss from './Dropdown.module.less';

const ContainerDiv = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');
const MarqueeButton = MarqueeDecorator({className: componentCss.marquee}, Button);
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
		 * The selections for Dropdown
		 *
		 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
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
		 * The direction where the dropdown list appears.
		 *
		 * @type {('left'|'right'|'down'|'up')}
		 * @default 'down'
		 * @public
		 */
		direction: PropTypes.oneOf(['down', 'left', 'right', 'up']),

		/**
		 * Disables Dropdown and becomes non-interactive.
		 *
		 * @type {Boolean}
		 * @public
		 */
		disabled: PropTypes.bool,

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
		 * The primary title text of Dropdown.
		 *
		 * The title will be replaced with the selected item, if set.
		 *
		 * @type {String}
		 * @public
		 */
		title: PropTypes.string
	},

	defaultProps: {
		direction: 'down',
		open: false
	},

	handlers: {
		onSelect: handle(
			forward('onSelect'),
			forward('onClose'),
			handleTransitionHide
		),
		onOpen: handle(
			forProp('open', false),
			forward('onOpen')
		)
	},

	styles: {
		css: componentCss,
		className: 'dropdown',
		publicClassNames: true
	},

	computed: {
		buttonClassName: ({open, styler}) => styler.append({open}),
		children: ({children, selected}) => {
			if (!Array.isArray(children)) return [];

			return children.map((child, i) => {
				const aria = {
					role: 'checkbox',
					'aria-checked': selected === i
				};

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
		transitionContainerClassname: ({css, open, direction, styler}) => styler.join(css.transitionContainer, {openTransitionContainer: open, upTransitionContainer: direction === 'up'}),
		dropdownButtonClassname: ({css, direction, styler}) => styler.join(css.dropdownButton, {upDropdownButton: direction === 'up'}),
		dropdownListClassname: ({children, css, styler}) => styler.join(css.dropdownList, {dropdownListWithScroller: children.length > 4}),
		title: ({children, selected, title}) => {
			if (isSelectedValid({children, selected})) {
				const child = children[selected];
				return typeof child === 'object' ? child.children : child;
			}

			return title;
		},
		transitionDirection: ({direction}) => {
			switch (direction) {
				case 'left':
					return 'right';
				case 'right':
					return 'left';
				case 'up':
					return 'down';
				case 'down':
				default:
					return 'up';
			}
		},
		hasChildren: ({children}) => {
			return children.length > 0;
		}
	},

	render: ({buttonClassName, children, css, dropdownButtonClassname, dropdownListClassname, disabled, hasChildren, onClose, onOpen, onSelect, open, selected, skin, transitionContainerClassname, transitionDirection, title, ...rest}) => {
		const ariaProps = extractAriaProps(rest);
		const opened = !disabled && open;
		const [DropDownButton, dropDownButtonProps, wrapperProps, skinVariants, groupProps, iconComponent] = (skin === 'silicon') ? [
			MarqueeButton,
			{icon: open ? 'arrowlargeup' : 'arrowlargedown'},
			{className: dropdownButtonClassname},
			{'night': false},
			{childComponent: RadioItem, itemProps: {size: 'small', className: css.dropDownListItem, css}, selectedProp: 'selected'},
			[]
		] : [
			Item,
			{},
			{},
			{},
			{childComponent: Item, itemProps: {size: 'small'}},
			[<Icon slot="slotAfter" key="icon" className={css.icon} size="small">{open ? 'arrowlargeup' : 'arrowlargedown'}</Icon>]

		];

		return (
			<div {...rest}>
				<div {...wrapperProps}>
					<DropDownButton
						role="button"
						className={buttonClassName}
						css={css}
						disabled={hasChildren ? disabled : true}
						onClick={opened ? onClose : onOpen}
						{...dropDownButtonProps}
						{...ariaProps}
					>
						{iconComponent}
						{title}
					</DropDownButton>
					<Transition
						className={transitionContainerClassname}
						visible={opened}
						direction={transitionDirection}
					>
						<ContainerDiv className={dropdownListClassname} spotlightDisabled={!open} spotlightRestrict="self-only">
							<Scroller skinVariants={skinVariants} className={css.scroller}>
								<Group
									role={null}
									className={css.group}
									onSelect={onSelect}
									selected={selected}
									{...groupProps}
								>
									{children || []}
								</Group>
							</Scroller>
						</ContainerDiv>
					</Transition>

				</div>
			</div>
		);
	}
});

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
			}
		}

		componentDidUpdate (prevProps) {
			const {open} = this.props;

			if (!prevProps.open && open) {
				on('click', this.handleClick);
			} else if (prevProps.open && !open) {
				off('click', this.handleClick);
			}
		}

		componentWillUnmount () {
			off('click', this.handleClick);
		}

		clickedOutsideDropdown = ({target}) => !this.node.contains(target);

		// If a click happened outside the component area close the dropdown by forwarding the onClick from Toggleable.
		handleClick = handle(
			this.clickedOutsideDropdown,
			forward('onClick')
		).bindAs(this, 'handleClick');

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
 * @mixes agate/Dropdown.DropdownDecorator
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const DropdownDecorator = compose(
	SpotlightContainerDecorator({
		enterTo: 'default-element',
		preserveId: true
	}),
	IdProvider({
		generateProp: null,
		prefix: 'd_'
	}),
	Toggleable({toggle: null, prop: 'open', activate: 'onOpen', deactivate: 'onClose', toggleProp: 'onClick'}),
	Changeable({change: 'onSelect', prop: 'selected'}),
	DropDownExtended,
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
