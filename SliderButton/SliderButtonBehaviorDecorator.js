import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import platform from '@enact/core/platform';
import PropTypes from 'prop-types';
import React from 'react';
import {findDOMNode} from 'react-dom';

/**
 * SliderButtonBehaviorDecorator passes props to support a11y feature in SliderButton
 *
 * @class SliderButtonBehaviorDecorator
 * @memberof agate/SliderButton
 * @private
 */
const SliderButtonBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'SliderButtonBehaviorDecorator';

		static propTypes = /** @lends agate/SliderButton.SliderButtonBehaviorDecorator.prototype */ {
			/**
			 * Items displayed with SliderButton.
			 *
			 * @type {Function}
			 * @private
			 */
			children: PropTypes.node,

			/**
			 * Called when value is changed.
			 *
			 * @type {Function}
			 * @private
			 */
			onChange: PropTypes.func
		};

		constructor (props) {
			super(props);

			this.ref = React.createRef();

			this.state = {
				valueText: props.children ? props.children[0] : null
			};
		}

		handleChange = ({value}) => {
			this.setState((prevState, props) => ({valueText: props.children[value]}));
			forward('onChange', {
				type: 'onChange',
				value
			}, this.props);
		};

		handleDragStart = () => {
			// on platforms with a touchscreen, we want to focus slider when dragging begins
			if (platform.touchscreen) {
				findDOMNode(ref.current).focus(); // eslint-disable-line
			}
		};

		render () {
			return (
				<Wrapped
					aria-valuetext={this.state.valueText}
					role="slider"
					{...this.props}
					onChange={this.handleChange}
					onDragStart={this.handleDragStart}
					ref={this.ref}
				/>
			);
		}
	};
});

export default SliderButtonBehaviorDecorator;
export {
	SliderButtonBehaviorDecorator
};
