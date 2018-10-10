// import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import {setDisplayName} from 'recompose';
import React from 'react';
import Changeable from '@enact/ui/Changeable';

import css from './DropManager.less';

// https://stackoverflow.com/questions/9907419/how-to-get-a-key-in-a-javascript-object-by-its-value
// By: ZER0 - Mar 28 '12 at 12:51
const getKeyByValue = (obj, value) =>
	Object.keys(obj).find(key => obj[key] === value);


const defaultConfig = {
	// The prop name for the boolean send to the Wrapped component that indicates whether we are
	// currently arranging things. Useful in case we need to show some boxes on the screen or
	// something. The default/common value for this is "arranging".
	arrangingProp: null,

	// The prop name for the object sent to the Wrapped component containing the arrangement object.
	// This also applies to the incoming arrangement prop name.
	// This will typically directly feed into Rearrangeable.
	arrangementProp: 'arrangement'
};

const DropManager = hoc(defaultConfig, (configHoc, Wrapped) => {
	const ArrangementState = Changeable({prop: configHoc.arrangementProp});

	const DropManagerBase = class extends React.Component {
		static displayName = 'DropManager';

		static propTypes = {
			arrangement: PropTypes.object,
			onArrange: PropTypes.func
		};

		state = {
			arrangement: this.props.arrangement || {},
			dragging: false
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

			// ev.dataTransfer.clearData();

			this.dragOriginNode.dataset.slot = dragDestination;
			dragDropNode.dataset.slot = dragOrigin;

			console.log('from:', dragOrigin, 'to:', dragDestination);
			// console.log('a1', this.state.arrangement);

			// We successfully completed the drag, blank-out the node.
			this.dragOriginNode = null;

			this.setState(({arrangement}) => {
				// console.log('a2', arrangement);
				const oldD = getKeyByValue(arrangement, dragDestination);
				const oldO = getKeyByValue(arrangement, dragOrigin);

				arrangement[oldD || dragDestination] = dragOrigin;
				arrangement[oldO || dragOrigin] = dragDestination;

				if (this.props.onArrange) {
					this.props.onArrange({arrangement});
				}

				// console.log('a3', arrangement);
				return {dragging: false, arrangement};
			});
		};

		// handleDragEnd = () => {
		// 	if (this.props.onArrange) {
		// 		this.props.onArrange({arrangement: this.state.arrangement});
		// 	}
		// };

		render () {
			const {className, ...rest} = {...this.props};
			delete rest.onArrange;

			if (configHoc.arrangingProp) rest[configHoc.arrangingProp] = this.state.dragging;
			if (configHoc.arrangementProp) rest[configHoc.arrangementProp] = this.state.arrangement;
			// console.log('slots:', rest);

			return (
				<Wrapped
					{...rest}
					className={classnames(className, css.dropManager, {dragging: this.state.dragging})}
					// draggable="true"
					onDragStart={this.handleDragStart}
					onDragEnter={this.handleDragEnter}
					onDragLeave={this.handleDragLeave}
					onDragOver={this.handleDragOver}
					onDrop={this.handleDrop}
					// onDragEnd={this.handleDragEnd}
				/>
			);
		}
	};

	return ArrangementState(DropManagerBase);
});

const DraggableContainerContext = React.createContext(null);

const Draggable = (Wrapped) => setDisplayName('Draggable')(
	// ({arrangement, name, ...rest}) => <Wrapped {...rest} data-slot={arrangement && arrangement[name] || name} draggable="true" />
	// If something is marked explicitly as *not* draggable (everything using this is normally)
	// don't assign it a data-slot, so it can't be dragged(A) or dropped on(B).
	({arrangement, containerShape, draggable = true, name, slot, ...rest}) =>
		<DraggableContainerContext.Provider value={{containerShape}}>
			<Wrapped
				{...rest}
				draggable={draggable}
				data-slot={draggable ? (arrangement && (arrangement[name] || arrangement[slot]) || (name || slot)) : null}
				data-slot-name={slot}
			/>
		</DraggableContainerContext.Provider>
);

const ResponsiveBox = (Wrapped) => setDisplayName('ResponsiveBox')(
	(props) => {
		console.log('props:', props);
		return (
			<DraggableContainerContext.Consumer>
				{({containerShape}) => {
					console.log('containerShape:', containerShape);
					return (<Wrapped containerShape={containerShape} {...props} />);
				}}
			</DraggableContainerContext.Consumer>
		);
	}
);

// const ResponsiveBox = kind({
// 	name: 'ResponsiveBox',
// 	render: ({component: Component, ...rest}) => (
// 		<DraggableContainerContext.Consumer>
// 			{(containerShape) => (
// 				<Component containerShape={containerShape} {...rest} />
// 			)}
// 		</DraggableContainerContext.Consumer>
// 	)
// });

export default DropManager;
export {
	DropManager,
	Draggable,
	ResponsiveBox
};
