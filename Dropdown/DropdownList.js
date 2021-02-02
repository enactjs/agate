import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Group from '@enact/ui/Group';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Item from '../Item';
import RadioItem from '../RadioItem';
import Scroller from '../Scroller';
import Skinnable from '../Skinnable';

import css from './Dropdown.module.less';

const ContainerDiv = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const DropdownListBase = kind({
	name: 'DropdownListBase',

	propTypes: {
		/**
		 * The selections for Dropdown
		 *
		 * @type {String[]|Array.<{key: (Number|String), children: (String|Component)}>}
		 */
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.string),
			PropTypes.arrayOf(PropTypes.shape({
				children: EnactPropTypes.renderable.isRequired,
				key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
			}))
		]),

		/**
		 * Placement of the Dropdown List.
		 *
		 * @type {String}
		 */
		direction: PropTypes.string,

		/**
		 * Called when an item is selected.
		 *
		 * @type {Function}
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
		 * Callback function that will receive the scroller's scrollTo() method
		 *
		 * @type {Function}
		 */
		scrollTo: PropTypes.func,

		/**
		 * Index of the selected item.
		 *
		 * @type {Number}
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
		 * State of possible skin variants.
		 *
		 * Used to style the internal [Scroller]{@link agate/Scroller.Scroller}.
		 *
		 * @type {Object}
		 */
		skinVariants: PropTypes.object,

		/**
		 * The width of DropdownList.
		 *
		 * @type {('huge'|'x-large'|'large'|'medium'|'small'|'tiny')}
		 */
		width: PropTypes.oneOf(['tiny', 'small', 'medium', 'large', 'x-large', 'huge'])
	},

	defaultProps: {
		direction: 'below center'
	},

	styles: {
		css,
		className: 'dropdownList'
	},

	computed: {
		className: ({children, direction, width, styler}) => styler.append(direction.substr(0, direction.indexOf(' ')), width, {dropdownListWithScroller: children.length > 4}),
		groupProps: ({skin}) => (skin === 'silicon') ?
			{childComponent: RadioItem, itemProps: {size: 'small', className: css.dropDownListItem, css}, selectedProp: 'selected'} :
			{childComponent: Item, itemProps: {css}, selectedProp: 'selected'}
	},

	render: ({children, groupProps, open, selected, skinVariants, scrollTo, onSelect, ...rest}) => {
		delete rest.width;
		delete rest.direction;
		delete rest.skin;

		return (
			<ContainerDiv
				{...rest}
				spotlightDisabled={!open}
				spotlightRestrict="self-only"
			>
				<Scroller
					skinVariants={skinVariants}
					className={css.scroller}
					cbScrollTo={scrollTo}
				>
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
		);
	}
});

const DropdownListSpotlightDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'DropdownListSpotlightDecorator';

		static propTypes = {
			/**
			 * Called when an item receives focus.
			 *
			 * @type {Function}
			 */
			onFocus: PropTypes.func,

			/**
			 * Index of the selected item.
			 *
			 * @type {Number}
			 */
			selected: PropTypes.number,

			/**
			 * The current skin for this component.
			 *
			 * @type {String}
			 * @public
			 */
			skin: PropTypes.string
		};

		constructor (props) {
			super(props);
		}

		componentDidUpdate () {
			// scroll to selected item and focus it
			const current = Spotlight.getCurrent();
			if (!Spotlight.getPointerMode() && !Spotlight.isPaused() && current && document.querySelector(`.${css.dropdownList}`)) {
				this.scrollTo({
					animate: false,
					focus: true,
					node: document.querySelector(`.${css.dropdownList} .${css.selected}`)
				});
			}
		}

		setScrollTo = (scrollTo) => {
			this.scrollTo = scrollTo;
		};

		render () {
			return (
				<Wrapped
					{...this.props}
					scrollTo={this.setScrollTo}
				/>
			);
		}
	};
});

const DropdownListDecorator = compose(
	DropdownListSpotlightDecorator,
	Skinnable({prop: 'skin', variantsProp: 'skinVariants'})
);

const DropdownList = DropdownListDecorator(DropdownListBase);

export default DropdownList;
export {
	DropdownList,
	DropdownListBase
};
