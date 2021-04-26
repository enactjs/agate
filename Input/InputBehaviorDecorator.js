import {forward} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import hoc from '@enact/core/hoc';
import {validateRangeOnce, validateSteppedOnce} from '@enact/ui/internal/validators';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Adds agate-specific input behaviors.
 *
 * @class InputBehaviorDecorator
 * @memberof agate/Input
 * 
 * 
 * @hoc
 * @public
 */
const InputBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'InputBehaviorDecorator';

		static propTypes = /** @lends agate/Input.InputBehaviorDecorator.prototype */ {
			value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

			onChange: PropTypes.func,
		};

		static defaultProps = {
			
		};

		constructor (props) {
			super(props);

			this.componentRef = React.createRef();
			console.log(props);

			this.state = {
				value: props.value ? props.value : ''
			};
		}

		handleChange = (ev) => {
			console.log(ev);

			this.setState({value: ev.target.value})
			// if (value !== this.state.value) {
			// 	// this.setState({value})
			// 	this.setState(
			// 		// {value}
			// 		() => ({value})
			// 		,
			// 		() => {
			// 			forward('onChange', {
			// 				type: 'onChange',
			// 				value
			// 			}, this.props);
			// 		}
			// 	);
			// }
			//
			// if (ev.stopPropagation) {
			// 	ev.stopPropagation();
			// }
		};

		handleClear = (ev) => {
			console.log('behavior handleClear')
			console.log(ev);

			this.setState({value: null})
		};

		handleBlur = (ev) => {
      		console.log('behavior handleBlur');
      		console.log(ev);

      		// if (ev.target === )
      		// console.log('handleClear')

			// this.setState({value: null})
		};

		handleOnMouseDown = (ev) => {
			console.log('behavior onMouseDown');
			// console.log(ev);

			// if (ev.target === )
			// console.log('handleClear')

			// this.setState({value: null})
		};

		render () {

			return (
				<Wrapped
					{...this.props}
					onChange={this.handleChange}
					onClick={this.handleClear}
					onBlur={this.handleBlur}
					onMouseDown={this.handleOnMouseDown}
					value={this.state.value}
				/>
			);
		}
	};
});

export default InputBehaviorDecorator;
export {
	InputBehaviorDecorator
};
