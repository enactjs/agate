import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {validateRangeOnce} from '@enact/ui/internal/validators';
import PropTypes from 'prop-types';
import React from 'react';

const validateRange = validateRangeOnce((props) => props, {'component': 'ArcPickerBehaviorDecorator'});

/**
 * Adds Agate-specific ArcPicker behaviors.
 *
 * @class ArcPickerBehaviorDecorator
 * @hoc
 * @memberof agate/ArcPicker
 * @private
 */
const ArcPickerBehaviorDecorator = hoc((config, Wrapped) => {
	return class extends React.Component {
		static displayName = 'ArcPickerBehaviorDecorator';

		static propTypes = /** @lends agate/ArcPicker.ArcPickerBehaviorDecorator.prototype */{
			/**
			 * The value options of ArcPicker.
			 *
			 * @type {Node}
			 * @required
			 * @public
			 */
			children: PropTypes.node.isRequired,

			/**
			 * The maximum value of ArcPicker.
			 *
			 * @type {Number}
			 * @public
			 */
			max: PropTypes.number,

			/**
			 * The min value of ArcPicker.
			 *
			 * @type {Number}
			 * @public
			 */
			min: PropTypes.number,

			/**
			 * Called when value is changed.
			 *
			 * @type {Function}
			 * @public
			 */
			onChange: PropTypes.func,

			/**
			 * Called when the path area is clicked.
			 *
			 * @type {Function}
			 * @param {Object} event
			 * @public
			 */
			onClick: PropTypes.func,

			/**
			 * Value of ArcPicker.
			 *
			 * @type {Number|String}
			 * @public
			 */
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		};

		constructor (props) {
			super(props);

			this.state = {
				isFocused: false
			};
		}

		handleClick = (value) => (ev) => {
			forward('onChange', {value}, this.props);
			ev.stopPropagation();
		};

		handleBlur = () => {
			this.setState({isFocused: false});
		};

		handleFocus = () => {
			this.setState({isFocused: true});
		};

		render () {
			const {children, max, min, value: valueProp, ...rest} = this.props;
			const value = ((valueProp || valueProp === 0) ? valueProp : children[0]);

			delete rest.onChange;

			if (__DEV__) {
				const valueProps = {value, max, min};

				validateRange(valueProps);
			}

			return (
				<Wrapped
					{...rest}
					isFocused={this.state.isFocused}
					onBlur={this.handleBlur}
					onClick={this.handleClick}
					onFocus={this.handleFocus}
					value={value}
				>
					{children}
				</Wrapped>
			);
		}
	};
});

export default ArcPickerBehaviorDecorator;
export {
	ArcPickerBehaviorDecorator
};
