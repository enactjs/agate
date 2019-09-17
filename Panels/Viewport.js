import classnames from 'classnames';
import {forward, handle} from '@enact/core/handle';
import Spotlight from '@enact/spotlight';
import Pause from '@enact/spotlight/Pause';
import ViewManager, {shape, SlideBottomArranger as VerticalArranger, SlideRightArranger as HorizontalArranger} from '@enact/ui/ViewManager';
import invariant from 'invariant';
import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

import SharedStateDecorator, {SharedState} from './SharedStateDecorator';

import css from './Panels.module.less';

/**
 * The container for a set of Panels
 *
 * @class Viewport
 * @memberof agate/Panels
 * @private
 */
const ViewportBase = class extends React.Component {
	static displayName = 'Viewport'

	static contextType = SharedState

	static propTypes = /** @lends agate/Panels.Viewport.prototype */ {

		/**
		 * A function that generates a globally-unique identifier for a panel index
		 *
		 * @type {Function}
		 * @required
		 */
		generateId: PropTypes.func.isRequired,

		/**
		 * Set of functions that control how the panels are transitioned into and out of the
		 * viewport
		 *
		 * @type {Arranger}
		 */
		arranger: shape,

		/**
		 * Panels to be rendered
		 *
		 * @type {Panel}
		 */
		children: PropTypes.node,

		/**
		 * Duration of the animation (in ms) when transitioning between `Panel` components.
		 *
		 * @type {Number}
		 * @default 500
		 * @public
		 */
		duration: PropTypes.number,

		/**
		 * Index of the active panel
		 *
		 * @type {Number}
		 * @default 0
		 */
		index: PropTypes.number,

		/**
		 * Disable panel transitions
		 *
		 * @type {Boolean}
		 * @default false
		 */
		noAnimation: PropTypes.bool,

		/**
		 * Direction of the animation when transitioning between `Panel` components.
		 *
		 * This is only applied when no arranger has been set. When using `'horizontal'`, a `SlideRightArranger` is used.
		 * When using `'vertical'`, a `SlideBottomArranger` is used.
		 *
		 * Valid values are:
		 * * `'horizontal'`, and
		 * * `'vertical'`.
		 *
		 * @type {String}
		 * @public
		 */
		orientation: PropTypes.string
	}

	static defaultProps = {
		duration: 500,
		index: 0,
		noAnimation: false
	}

	constructor () {
		super();

		this.paused = new Pause('Viewport');
		this.state = {
			prevIndex: -1,
			direction: 'forward'
		};
	}

	static getDerivedStateFromProps (props, state) {
		return {
			prevIndex: props.index,
			direction: state.prevIndex > props.index ? 'backward' : 'forward'
		};
	}

	componentDidMount () {
		// eslint-disable-next-line react/no-find-dom-node
		this.node = ReactDOM.findDOMNode(this);
	}

	componentDidUpdate (prevProps) {
		for (let i = prevProps.index; this.context && i > this.props.index; i--) {
			this.context.delete(i);
		}
	}

	componentWillUnmount () {
		this.paused.resume();
	}

	addTransitioningClass = () => {
		if (this.node) {
			this.node.classList.add(css.transitioning);
		}

		return true;
	}

	removeTransitioningClass = () => {
		if (this.node) {
			this.node.classList.remove(css.transitioning);
		}

		return true;
	}

	pause = () => this.paused.pause()

	resume = () => this.paused.resume()

	handle = handle.bind(this)

	handleTransition = this.handle(
		forward('onTransition'),
		this.removeTransitioningClass,
		this.resume
	)

	handleWillTransition = this.handle(
		forward('onWillTransition'),
		this.addTransitioningClass,
		this.pause
	)

	mapChildren = (children, generateId) => React.Children.map(children, (child, index) => {
		if (child) {
			const {spotlightId = generateId(index, 'panel-container', Spotlight.remove)} = child.props;
			const props = {
				spotlightId,
				'data-index': index
			};

			if (child.props.autoFocus == null && this.state.direction === 'forward') {
				props.autoFocus = 'default-element';
			}

			return React.cloneElement(child, props);
		} else {
			return null;
		}
	})

	getArranger = () => {
		const {arranger, orientation} = this.props;

		if (arranger) return arranger;
		if (orientation === 'vertical') return VerticalArranger;
		else return HorizontalArranger;
	}

	getEnteringProp = (noAnimation) => noAnimation ? null : 'hideChildren'

	render () {
		const {children, duration, generateId, index, noAnimation, ...rest} = this.props;
		const arranger = this.getArranger();
		const enteringProp = this.getEnteringProp(noAnimation);
		const mappedChildren = this.mapChildren(children, generateId);
		const className = classnames(css.viewport, rest.className);

		const count = React.Children.count(mappedChildren);
		invariant(
			index === 0 && count === 0 || index < count,
			`Panels index, ${index}, is invalid for number of children, ${count}`
		);

		delete rest.arranger;
		delete rest.orientation;

		return (
			<ViewManager
				{...rest}
				arranger={arranger}
				className={className}
				component="main"
				duration={duration}
				enteringDelay={100} // TODO: Can we remove this?
				enteringProp={enteringProp}
				index={index}
				noAnimation={noAnimation}
				onTransition={this.handleTransition}
				onWillTransition={this.handleWillTransition}
			>
				{mappedChildren}
			</ViewManager>
		);
	}
};

const Viewport = SharedStateDecorator(ViewportBase);

export default Viewport;
export {
	Viewport,
	ViewportBase
};
