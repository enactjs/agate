/**
 * Agate styled Header.
 *
 * @example
 * <Dropdown
 * 		defaultSelected={2}
 *		inline
 *		title="Dropdown"
 * >
 *   {['Option 1', 'Option 2', 'Option 3', 'Option 4']}
 * </Dropdown>
 *
 * @module agate/Dropdown
 * @exports Dropdown
 */

import React from 'react';
import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import Group from '@enact/ui/Group';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import Toggleable from '@enact/ui/Toggleable';
import Transition from '@enact/ui/Transition';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import Skinnable from '../Skinnable';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Scroller from '@enact/ui/Scroller';
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

	propTypes: /** @lends agate/Dropdown.Dropdown.prototype */ {
		/*
		 * The selections for Dropdown
		 *
		 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
		 */
		children: PropTypes.array,
		/*
		 * Called when an item is selected.
		 *
		 * @type {Function}
		 */
		onSelect: PropTypes.func,
		/*
		 * Called when clicked on the dropdown to open.
		 *
		 * @type {Number}
		 */

		open: PropTypes.bool,
		/*
		 * Index of the selected item.
		 *
		 * @type {Number}
		 */
		selected: PropTypes.number
	},

	defaultProps: {
		direction: 'down',
		open: false
	},

	styles: {
		css: componentCss,
		className: 'Dropdown',
		publicClassNames: true
	},

	computed: {
		className: ({css, selected, styler}) => styler.append(selected && css.selected),
		transitionContainerClassname: ({css, open, styler}) => styler.join(css.transitionContainer, (open ? css.openTransitionContainer : null)),
		title: ({children, selected}) => {
			if (isSelectedValid({children, selected})) {
				const child = children[selected];
				return typeof child === 'object' ? child.children : child;
			}

			return children[0];
		}
	},

	render: ({children, css, onSelect, open, icon, transitionContainerClassname, transitionDirection, title, dataSize, itemSize, styler, ...rest}) => {
		delete rest.extended;
		return (
			<div {...rest}>
				<Item {...rest} css={css}>
					<Icon slot="slotAfter" className={css.icon} size="small">{open ? 'arrowlargeup' : 'arrowlargedown'}</Icon>
					{title}
				</Item>
				<Transition
					className={transitionContainerClassname}
					visible={open}
					direction={transitionDirection}
				>
					<ContainerDiv className={styler.join(css.dropdownList, {dropdownListWithScroller: children.length > 4})} spotlightDisabled={!open} spotlightRestrict="self-only">
						<Scroller className={css.scroller}>
							<Group
								className={css.group}
								childComponent={Item}
								itemProps={{size: 'small', className: css.swatch}}
								onSelect={onSelect}
							>{children || []}</Group>
						</Scroller>
					</ContainerDiv>
				</Transition>
			</div>
		);
	}
});



/**
 * Applies Agate specific behaviors to [ColorPickerBase]{@link agate/Dropdown.DropdownBase}.
 *
 * @hoc
 * @memberof agate/Dropdown
 * @mixes ui/Toggleable.Toggleable
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const DropdownDecorator = compose(
	Toggleable({toggle: null, prop: 'open', toggleProp: 'onClick'}),
	Changeable({change: 'onSelect', prop: 'selected'}),
	Skinnable
);



/**
 * A Agate Dropdown component.
 *
 * By default, `Dropdown` maintains the state of its `selected` property. Supply the
 * `defaultSelected` property to control its initial value. If you wish to directly control updates
 * to the component, supply a value to `selected` at creation time and update it in response to
 * `onSelected` events.
 *
 * @class Dropdown
 * @memberof agate/Dropdown
 * @extends agate/Dropdown.DropdownBase
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