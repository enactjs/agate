/**
 * Components to support drag and drop.
 *
 * @module agate/DropManager
 * @exports Droppable
 * @exports DropManager
 * @exports Draggable
 * @exports ResponsiveBox
 * @public
 */

import hoc from '@enact/core/hoc';
import kind from '@enact/core/kind';
import Changeable from '@enact/ui/Changeable';
import Slottable from '@enact/ui/Slottable';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {mergeDeepRight} from 'ramda';
import {createContext, Component} from 'react';

import Rearrangeable from '../Rearrangeable';

import css from './DropManager.module.less';

const getKeyByValue = (obj, value) =>
	Object.keys(obj).find(key => obj[key] === value);

// Establish the base container shape, to be shared with all components as a consistent starting point.
const containerShapePropTypes = PropTypes.shape({
	/**
	 * When true it means that the draggable container takes all the available space up to the edge of the screen.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	edge: PropTypes.bool,

	/**
	 * Defines the position of the draggable container relative to screen edges.
	 *
	 * @type {Object}
	 * @public
	 */
	edges: PropTypes.shape({
		bottom: PropTypes.bool,
		left: PropTypes.bool,
		right: PropTypes.bool,
		top: PropTypes.bool
	}),

	/**
	 * When true it means that the draggable container takes all the available space between the horizontal screen edges.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	horizontalEdge: PropTypes.bool,

	/**
	 * The layout orientation of the components inside a draggable container.
	 *
	 * @type {String}
	 * @public
	 */
	orientation: PropTypes.string,

	/**
	 * The size of the draggable container relative to the screen.
	 *
	 * @type {Object}
	 * @public
	 */
	size: PropTypes.shape({
		relative: PropTypes.string  // Relative size: small, medium, large, full
		// proposed - height: PropTypes.number,
		// proposed - width: PropTypes.number
	}),

	/**
	 * When true it means that the draggable container takes all the available space between the vertical screen edges.
	 *
	 * @type {Boolean}
	 * @default false
	 * @public
	 */
	verticalEdge: PropTypes.bool
});

const defaultContainerShape = {
	edge: false,
	edges: {
		top: false,
		right: false,
		bottom: false,
		left: false
	},
	horizontalEdge: false,
	verticalEdge: false,
	orientation: null,
	size: {
		relative: null  // Relative size: small, medium, large, full
		// proposed - height: 0,
		// proposed - width: 0
	}
};

/**
 * Default config for DropManager.
 *
 * @memberof agate/DropManager.DropManager
 * @hocconfig
 */
const defaultConfig = {
	// The prop name for the boolean send to the Wrapped component that indicates whether we are
	// able to arrange things. Useful in case we need to show some boxes on the screen or
	// something. The default/common value for this is "arrangeable".
	arrangeableProp: null,

	// The prop name for the boolean send to the Wrapped component that indicates whether we are
	// currently arranging things. Useful in case we need to add an overlay or hide content during
	// dragging. The default/common value for this is "arranging".
	arrangingProp: null,

	// The prop name for the object sent to the Wrapped component containing the arrangement object.
	// This also applies to the incoming arrangement prop name.
	// This will typically directly feed into Rearrangeable.
	// The default/common value for this is "arrangement".
	arrangementProp: null
};

// The arrangementProp above is allowed to be empty. When it's empty, though, and the user doesn't
// want the prop delivered to their Wrapped component, we still need to have some prop name to
// communicate to Rearrangeable. That's where this comes in; it's used if the user didn't specify a
// prop, so we can send an arrangement to Rearrangeable, exclusively.
const fallbackArrangementProp = 'arrangement';

const DropManagerContext = createContext(defaultContainerShape);

/**
 * Applies Agate specific behaviors to {@link agate/DropManager.DropManagerBase|DropManagerBase} components.
 *
 * @class DropManager
 * @hoc
 * @memberof agate/DropManager
 * @public
 */
const DropManager = hoc(defaultConfig, (configHoc, Wrapped) => {
	const ArrangementState = Changeable({prop: configHoc.arrangementProp || fallbackArrangementProp});

	const DropManagerBase = class extends Component {
		static displayName = 'DropManager';

		static propTypes = /** @lends agate/DropManager.DropManager.prototype */ {
			/**
			 * The ready-state to indicate that the contents are allowed to be rearranged.
			 *
			 * @type {Boolean}
			 * @default false
			 * @public
			 */
			arrangeable: PropTypes.bool,

			/**
			 * The arrangement object, consumable by `Rearrangeable`. This represents the initial
			 * arrangement and will be forwarded to `Rearrangeable` as well as the `Draggable`
			 * children. This is ingested using `Changeable`.
			 *
			 * @type {Object}
			 * @public
			 */
			arrangement: PropTypes.object,

			/**
			 * Executed when an arranging (dragging) action has completed. Included in the payload
			 * is a new arrangement object, which can be saved for later arrangement recall.
			 *
			 * @type {Function}
			 * @public
			 */
			onArrange: PropTypes.func
		};

		static defaultProps = {
			arrangeable: false
		};

		state = {
			dragging: false,
			touchOverElement: null
		};

		addDropTarget = (target) => {
			target.classList.add('dropTarget');
		};

		removeDropTarget = (target) => {
			target.classList.remove('dropTarget');
		};

		handleDragStart = (ev) => {
			ev.dataTransfer.setData('text/plain', ev.target.dataset.slot);
			ev.dataTransfer.effectAllowed = 'move';
			this.dragOriginNode = ev.target;
			this.setState({dragging: true});
		};

		handleDragEnter = (ev) => {
			this.addDropTarget(ev.target);
		};

		handleDragLeave = (ev) => {
			this.removeDropTarget(ev.target);
		};

		handleDragOver = (ev) => {
			ev.preventDefault();
			// Set the dropEffect to move
			ev.dataTransfer.dropEffect = 'move';
		};

		handleDrop = (ev) => {
			ev.preventDefault();
			ev.dataTransfer.clearData();

			// Bail early if the drag started from some unknown location.
			if (!this.dragOriginNode) {
				this.setState({dragging: false});
				return;
			}

			// Get the id of the target and add the moved element to the target's DOM
			// const dragOrigin = ev.dataTransfer.getData('text/plain');
			const dragOrigin = this.dragOriginNode.dataset.slot;

			let dragDropNode;
			// If we dropped directly on an element with a slot defined, just use that directly
			if (ev.target.dataset.slot) {
				dragDropNode = ev.target;
			} else {
				// If we dropped on a child of a slotted element (like an icon or a div or other
				// nested component), find the closest ancestor with a slot and use that as the drop element.
				const closestSlot = ev.target.closest('[data-slot]');
				if (closestSlot && closestSlot.dataset.slot) {
					dragDropNode = closestSlot;
				} else {
					// We didn't actually find anything, just bail out. The component was dropped in
					// a place that is unknown.
					this.setState({dragging: false});
					return;
				}
			}

			this.removeDropTarget(dragDropNode);

			// Get the destination element's slot value, or find its ancestor that has one (in case we drop this on a child or grandchild of the slotted item).
			// const dragDestination = ev.target.dataset.slot || (ev.target.closest('[data-slot]') && ev.target.closest('[data-slot]').dataset.slot);
			const dragDestination = dragDropNode.dataset.slot;

			// If the dragged element was dropped back on itself, do nothing and exit.
			if (dragDestination === dragOrigin) {
				this.setState({dragging: false});
				return;
			}

			this.dragOriginNode.dataset.slot = dragDestination;
			dragDropNode.dataset.slot = dragOrigin;

			// We successfully completed the drag, blank-out the node.
			this.dragOriginNode = null;

			const {arrangement, onArrange} = this.props;
			const oldD = getKeyByValue(arrangement, dragDestination);
			const oldO = getKeyByValue(arrangement, dragOrigin);

			arrangement[oldD || dragDestination] = dragOrigin;
			arrangement[oldO || dragOrigin] = dragDestination;

			if (onArrange) {
				onArrange({arrangement});
			}

			this.setState({dragging: false});
		};

		handleTouchStart = (ev) => {
			this.dragOriginNode = ev.target;
			this.setState({dragging: true});
		};

		handleTouchMove = (ev) => {
			let touchMoveOverElem = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);

			if (this.state.touchOverElement && this.state.touchOverElement !== touchMoveOverElem) {
				this.removeDropTarget(this.state.touchOverElement);
				this.addDropTarget(touchMoveOverElem);
				this.setState(() => ({touchOverElement: touchMoveOverElem}));
			} else {
				this.addDropTarget(touchMoveOverElem);
				this.setState(() => ({touchOverElement: touchMoveOverElem}));
			}
		};

		handleTouchEnd = (ev) => {
			ev.preventDefault();

			// Bail early if the drag started from some unknown location.
			if (!this.dragOriginNode || !this.dragOriginNode.dataset.slot) {
				this.setState({dragging: false});
				return;
			}

			if (this.state.touchOverElement) {
				this.removeDropTarget(this.state.touchOverElement);
			}

			// Get the id of the target and add the moved element to the target's DOM
			const dragOrigin = this.dragOriginNode.dataset.slot;

			let dropOverElem = document.elementFromPoint(ev.changedTouches[0].clientX, ev.changedTouches[0].clientY);

			let dragDropNode;
			// If we dropped directly on an element with a slot defined, just use that directly
			if (dropOverElem.dataset.slot) {
				dragDropNode = dropOverElem;
			} else {
				// If we dropped on a child of a slotted element (like an icon or a div or other
				// nested component), find the closest ancestor with a slot and use that as the drop element.
				const closestSlot = ev.target.closest('[data-slot]');
				if (closestSlot && closestSlot.dataset.slot) {
					dragDropNode = closestSlot;
				} else {
					// We didn't actually find anything, just bail out. The component was dropped in
					// a place that is unknown.
					this.setState({dragging: false});
					return;
				}
			}

			// Get the destination element's slot value, or find its ancestor that has one (in case we drop this on a child or grandchild of the slotted item).
			// const dragDestination = ev.target.dataset.slot || (ev.target.closest('[data-slot]') && ev.target.closest('[data-slot]').dataset.slot);
			const dragDestination = dragDropNode.dataset.slot;

			// If the dragged element was dropped back on itself, do nothing and exit.
			if (dragDestination === dragOrigin) {
				this.setState({dragging: false});
				return;
			}

			this.dragOriginNode.dataset.slot = dragDestination;
			dragDropNode.dataset.slot = dragOrigin;

			// We successfully completed the drag, blank-out the node.
			this.dragOriginNode = null;

			const {arrangement, onArrange} = this.props;
			const oldD = getKeyByValue(arrangement, dragDestination);
			const oldO = getKeyByValue(arrangement, dragOrigin);

			arrangement[oldD || dragDestination] = dragOrigin;
			arrangement[oldO || dragOrigin] = dragDestination;

			if (onArrange) {
				onArrange({arrangement});
			}

			this.setState({dragging: false});
		};

		render () {
			const {arrangement, arrangeable, className, ...rest} = {...this.props};
			delete rest.onArrange;

			rest[configHoc.arrangementProp || fallbackArrangementProp] = arrangement;
			if (configHoc.arrangeableProp) rest[configHoc.arrangeableProp] = arrangeable;
			if (configHoc.arrangingProp) rest[configHoc.arrangingProp] = this.state.dragging;

			if (arrangeable) {
				// Add all the necessary events, but only if we're in edit mode
				rest.onDragStart = this.handleDragStart;
				rest.onDragEnter = this.handleDragEnter;
				rest.onDragLeave = this.handleDragLeave;
				rest.onDragOver = this.handleDragOver;
				rest.onDrop = this.handleDrop;
				rest.onTouchStart = this.handleTouchStart;
				rest.onTouchMove = this.handleTouchMove;
				rest.onTouchEnd = this.handleTouchEnd;
			}

			return (
				<DropManagerContext.Provider
					value={{
						arrangement,
						arranging: this.state.dragging,
						arrangeable
					}}
				>
					<Wrapped
						{...rest}
						className={classnames(className, css.dropManager, (arrangeable ? css.arrangeable : ''), {dragging: this.state.dragging})}
						// draggable="true"
					/>
				</DropManagerContext.Provider>
			);
		}
	};

	return ArrangementState(DropManagerBase);
});

// Draw conclusions from supplied shape information and auto-set some values based on logical
// conclusions to save time and improve consistency for consumers.
const logicallyPopulateContainerShape = (cs) => {
	if (cs.edges.left || cs.edges.right) {
		cs.horizontalEdge = true;
		cs.edge = true;
	}
	if (cs.edges.top || cs.edges.bottom) {
		cs.verticalEdge = true;
		cs.edge = true;
	}
	// return cs;
};

const DraggableContainerContext = createContext(null);

/**
 * Draggable passes props to support the dragging feature in DropManager.
 *
 * @class Draggable
 * @memberof agate/DropManager
 * @ui
 * @public
 */
const Draggable = (Wrapped) => kind({
	name: 'Draggable',

	propTypes: /** @lends agate/DropManager.Draggable.prototype */ {
		/**
		 * Defines the shape of the draggable container relative to the screen edges.
		 *
		 * @type {Object}
		 * @public
		 */
		containerShape: containerShapePropTypes,

		/**
		 * Allows a container to be dragged.
		 *
		 * @type {Boolean}
		 * @default false
		 * @public
		 */
		draggable: PropTypes.bool,

		/**
		 * The draggable container's name.
		 *
		 * @type {String}
		 * @public
		 */
		name: PropTypes.string,

		/**
		 * A slot to insert the draggable container.
		 *
		 * @type {String}
		 * @public
		 */
		slot: PropTypes.string
	},

	// If something is marked explicitly as *not* draggable (everything using this is normally)
	// don't assign it a data-slot, so it can't be dragged(A) or dropped on(B).
	render: ({containerShape = {}, draggable = true, name, slot, ...rest}) => {
		// Apply a consistent (predictable) set of object keys for consumers
		// defaultProps is a shallow merge only, so we aren't using it :(
		containerShape = mergeDeepRight(defaultContainerShape, containerShape);

		// Draw conclusions from supplied shape information and auto-set some values.
		logicallyPopulateContainerShape(containerShape);

		Object.freeze(containerShape);

		return (
			<DropManagerContext.Consumer>
				{({arrangement, arrangeable}) => {
					return (
						<DraggableContainerContext.Provider value={{containerShape}}>
							<Wrapped
								{...rest}
								draggable={arrangeable && draggable}
								data-slot={draggable ? (arrangement && (arrangement[name] || arrangement[slot]) || (name || slot)) : null}
								data-slot-name={slot}
							/>
						</DraggableContainerContext.Provider>
					);
				}}
			</DropManagerContext.Consumer>
		);
	}
});

/**
 * ResponsiveBox passes props to support the responsive layout feature in DropManager..
 *
 * @class ResponsiveBox
 * @memberof agate/DropManager
 * @ui
 * @public
 */
const ResponsiveBox = (Wrapped) => {
	const Decorator = (props) => (
		<DraggableContainerContext.Consumer>
			{(ctx) => {
				const containerShape = ctx ? ctx.containerShape : defaultContainerShape;
				return (
					<Wrapped containerShape={containerShape} {...props} />
				);
			}}
		</DraggableContainerContext.Consumer>
	);
	Decorator.displayName = 'ResponsiveBox';
	return Decorator;
};

// Consolidate usage pattern into a simple reusable piece
/**
 * Applies Agate specific behaviors to {@link agate/DropManager.DropManager|DropManager} components.
 *
 * @class Droppable
 * @hoc
 * @memberof agate/DropManager
 * @mixes agate/Rearrangeable.Rearrangeable
 * @mixes ui/Slottable.Slottable
 * @public
 */
const Droppable = hoc((configHoc, Wrapped) => {
	const {arrangementProp, slots, ...rest} = configHoc;
	return DropManager({arrangementProp, ...rest},
		Slottable({slots},
			Rearrangeable({arrangementProp, slots},
				Wrapped
			)
		)
	);
});

export default Droppable;
export {
	Droppable,
	DropManager,
	Draggable,
	ResponsiveBox
};
