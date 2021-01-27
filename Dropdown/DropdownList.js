import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import EnactPropTypes from '@enact/core/internal/prop-types';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';
import ReactDOM from 'react-dom';

import Skinnable from '../Skinnable';
import classnames from 'classnames';

import css from './Dropdown.module.less';
import equals from 'ramda/src/equals';
import Scroller from '../Scroller';
import Group from '@enact/ui/Group';
import Transition from '@enact/ui/Transition';


const isSelectedValid = ({children, selected}) => Array.isArray(children) && children[selected] != null;
const ContainerDiv = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');
const oppositeDirection = {left: 'right', right: 'left', up: 'down', down: 'up'};

const getKey = ({children, selected}) => {
	if (isSelectedValid({children, selected})) {
		return children[selected].key;
	}
};

const indexFromKey = (children, key) => {
	let index = -1;
	if (children) {
		index = children.findIndex(child => child.key === key);
	}

	return index;
};


/**
 * Compares two children and returns true if they are equivalent, false otherwise.
 *
 * @function
 * @param   {children}    a    children props
 *  @param   {children}    b    children props
 *
 * @returns {Boolean}          `true` if same
 * @memberof sandstone/internal/util
 * @private
 */
const compareChildren = (a, b) => {
	if (!a || !b || a.length !== b.length) return false;

	let type = null;
	for (let i = 0; i < a.length; i++) {
		type = type || typeof a[i];
		if (type === 'string') {
			if (a[i] !== b[i]) {
				return false;
			}
		} else if (!equals(a[i], b[i])) {
			return false;
		}
	}

	return true;
};


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
		 * Called when an item is selected.
		 *
		 * @type {Function}
		 */
		onSelect: PropTypes.func,

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
		 * State of possible skin variants.
		 *
		 * Used to scale the `itemSize` of the `VirtualList` based on large-text mode
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

	styles: {
		css,
		className: 'dropdownList'
	},

	computed: {
		adjustedDirection: ({transitionDirection, 'data-spotlight-id': containerId}) => {
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
					let adjustedDirection = transitionDirection;
					if (overflow.isOverTop && !overflow.isOverBottom && transitionDirection === 'up') {
						adjustedDirection = 'down';
					} else if (overflow.isOverBottom && !overflow.isOverTop && transitionDirection === 'down') {
						adjustedDirection = 'up';
					}

					return adjustedDirection;
				};

				const containerSelector = `[data-spotlight-id='${containerId}']`;
				const containerNode = document.querySelector(`${containerSelector} .${css.dropdownList}`);
				const clientNode = document.querySelector(`${containerSelector} .${css.dropdown}`);
				const wrapperNode = clientNode && clientNode.closest('div[style*=overflow]');

				if (containerNode && clientNode) {
					const containerNodeRect = containerNode.getBoundingClientRect();
					const clientNodeRect = clientNode.getBoundingClientRect();
					const wrapperNodeRect = wrapperNode && wrapperNode.getBoundingClientRect();
					return adjustDirection(calcOverflow(containerNodeRect, clientNodeRect, wrapperNodeRect));
				}
			}

			return transitionDirection;
		},
		className: ({children, width, styler}) => styler.append(width, {dropdownListWithScroller: children.length > 4})
	},

	render: ({adjustedDirection, children, disabled, dropdownListClassName, groupProps, open, selected, skinVariants, onSelect, ...rest}) => {
		const transitionContainerClassName = classnames(css.transitionContainer, {[css.openTransitionContainer]: open, [css.upTransitionContainer]: adjustedDirection === 'up'});
		const opened = !disabled && open;
console.log(disabled, skinVariants);
		delete rest.width;
		delete rest.transitionDirection;

		return (
			<Transition
				className={transitionContainerClassName}
				visible={opened}
				direction={oppositeDirection[adjustedDirection]}
			>
				<ContainerDiv
					{...rest}
					spotlightDisabled={!open}
					spotlightRestrict="self-only"
				>
					<Scroller
						skinVariants={skinVariants}
						className={css.scroller}
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
			</Transition>
		);
	}
});

const ReadyState = {
	// Initial state. Scrolling and focusing pending
	INIT: 0,
	// Scroll requested
	SCROLLED: 1,
	// Focus completed or not required
	DONE: 2
};

const DropdownListSpotlightDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'DropdownListSpotlightDecorator';

		static propTypes = {
			/*
			 * Called when an item receives focus.
			 *
			 * @type {Function}
			 */
			onFocus: PropTypes.func,

			/*
			 * Index of the selected item.
			 *
			 * @type {Number}
			 */
			selected: PropTypes.number
		};

		constructor (props) {
			super(props);

			this.state = {
				prevChildren: props.children,
				prevFocused: null,
				prevSelected: this.props.selected,
				prevSelectedKey: getKey(props),
				ready: isSelectedValid(props) ? ReadyState.INIT : ReadyState.DONE
			};
		}

		componentDidMount () {
			// eslint-disable-next-line react/no-find-dom-node
			this.node = ReactDOM.findDOMNode(this);
			Spotlight.set(this.node.dataset.spotlightId, {
				defaultElement: '[data-selected="true"]',
				enterTo: 'default-element'
			});
		}

		componentDidUpdate () {
			if (this.state.ready === ReadyState.INIT) {
				this.scrollIntoView();
			} else if (this.state.ready === ReadyState.SCROLLED) {
				this.focusSelected();
			} else {
				const key = getKey(this.props);
				const keysDiffer = key && this.state.prevSelectedKey && key !== this.state.prevSelectedKey;

				if (keysDiffer ||
					((!key || !this.state.prevSelectedKey) && this.state.prevSelected !== this.props.selected) ||
					!compareChildren(this.state.prevChildren, this.props.children)
				) {
					this.resetFocus(keysDiffer);
				}
			}
		}

		// setScrollTo = (scrollTo) => {
		// 	this.scrollTo = scrollTo;
		// };

		resetFocus (keysDiffer) {
			let adjustedFocusIndex;

			if (!keysDiffer && this.lastFocusedKey) {
				const targetIndex = indexFromKey(this.props.children, this.lastFocusedKey);
				if (targetIndex >= 0) {
					adjustedFocusIndex = targetIndex;
				}
			}

			this.setState({
				prevChildren: this.props.children,
				prevFocused: adjustedFocusIndex,
				prevSelected: this.props.selected,
				prevSelectedKey: getKey(this.props),
				ready: ReadyState.INIT
			});
		}

		scrollIntoView = () => {
			let {selected} = this.props;

			if (this.state.prevFocused == null && !isSelectedValid(this.props)) {
				selected = 0;
			} else if (this.state.prevFocused != null) {
				selected = this.state.prevFocused;
			}

			// this.scrollTo({
			// 	animate: false,
			// 	focus: true,
			// 	index: selected,
			// 	offset: ri.scale(126 * 2), // @sand-item-small-height * 2 (TODO: large text mode not supported!)
			// 	stickTo: 'start' // offset from the top of the dropdown
			// });

			this.setState({ready: ReadyState.SCROLLED});
		};

		focusSelected () {
			this.setState({ready: ReadyState.DONE});
		}

		handleFocus = (ev) => {
			const current = ev.target;
			if (this.state.ready === ReadyState.DONE && !Spotlight.getPointerMode() &&
				current.dataset['index'] != null && this.node.contains(current)
			) {
				const focusedIndex = Number(current.dataset['index']);
				const lastFocusedKey = getKey({children: this.props.children, selected: focusedIndex});
				this.lastFocusedKey = lastFocusedKey;
			}

			if (this.props.onFocus) {
				this.props.onFocus(ev);
			}
		};

		render () {
			return (
				<Wrapped {...this.props} onFocus={this.handleFocus} />
			);
		}
	};
});

const DropdownListDecorator = compose(
	DropdownListSpotlightDecorator,
	Skinnable({variantsProp: 'skinVariants'})
	//Skinnable
);

const DropdownList = DropdownListDecorator(DropdownListBase);

export default DropdownList;
export {
	DropdownList,
	DropdownListBase,
	isSelectedValid,
	compareChildren
};
