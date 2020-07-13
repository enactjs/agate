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

import {handle, forward, forProp} from '@enact/core/handle';
import kind from '@enact/core/kind';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import Toggleable from '@enact/ui/Toggleable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Button from '../Button';
import Icon from '../Icon';
import Item from '../Item';
import RadioItem from '../RadioItem';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

import componentCss from './Dropdown.module.less';

const ContainerDiv = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');
const isSelectedValid = ({children, selected}) => Array.isArray(children) && children[selected] != null;

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
			forward('onClose')
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
		className: ({open, styler}) => styler.append({listOpen: open, listClosed: !open}),
		transitionContainerClassname: ({css, open, direction, styler}) => styler.join(css.transitionContainer, {openTransitionContainer: open, upTransitionContainer: direction === 'up'} ),
		dropdownButtonClassname: ({css, direction, styler}) => styler.join(css.dropdownButton, {upDropdownButton: direction === 'up'} ),
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

	render: ({children, className, css, dropdownButtonClassname, dropdownListClassname, disabled, hasChildren, onClose, onOpen, onSelect, open, selected, skin, transitionContainerClassname, transitionDirection, title, ...rest}) => {
		const opened = !disabled && open;
		const [DropDownButton, wrapperProps, groupProps] = (skin === 'silicon') ? [
			Button,
			{className: dropdownButtonClassname},
			{childComponent: RadioItem, itemProps: {size: 'small', className: css.dropDownListItem, css}, selectedProp: 'selected'}
		] : [
			Item,
			{},
			{childComponent: Item, itemProps: {size: 'small'}}
		];

		return (
			<div className={className} {...rest} >
				<div {...wrapperProps}>
					<DropDownButton
						className={className}
						css={css}
						disabled={hasChildren ? disabled : true}
						onClick={opened ? onClose : onOpen}
					>
						<Icon slot="slotAfter" className={css.icon} size="small">{open ? 'arrowlargeup' : 'arrowlargedown'}</Icon>
						{title}
					</DropDownButton>
					<Transition
						className={transitionContainerClassname}
						visible={opened}
						direction={transitionDirection}
					>
						<ContainerDiv className={dropdownListClassname} spotlightDisabled={!open} spotlightRestrict="self-only">
							<Scroller className={css.scroller}>
								<Group
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
	Toggleable({toggle: null, prop: 'open', activate: 'onOpen', deactivate: 'onClose'}),
	Changeable({change: 'onSelect', prop: 'selected'}),
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
