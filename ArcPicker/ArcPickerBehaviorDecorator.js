import {forward} from '@enact/core/handle';
import {is} from '@enact/core/keymap';
import hoc from '@enact/core/hoc';
import platform from '@enact/core/platform';
import {validateRangeOnce} from '@enact/ui/internal/validators';
import PropTypes from 'prop-types';
import {Component} from 'react';

const isDown = is('down');
const isUp = is('up');

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
	return class extends Component {
		static displayName = 'ArcPickerBehaviorDecorator';

		static propTypes = /** @lends agate/ArcPicker.ArcPickerBehaviorDecorator.prototype */{
			/**
			 * The value options of ArcPicker.
			 *
			 * @type {Array}
			 * @required
			 * @public
			 */
			children: PropTypes.array.isRequired,

			/**
			 * Whether or not the component is in a disabled state.
			 *
			 * @type {Boolean}
			 * @public
			 */
			disabled: PropTypes.bool,

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
			if (platform.touchscreen) {
				this.setState({isFocused: true}, () => {
					setTimeout(() => {
						this.setState({isFocused: false});
					}, 200)
				});
			}

			forward('onChange', {value}, this.props);
			ev.stopPropagation();
		};

		handlePointerDown = (value) => (ev) => {
			if (platform.touchscreen) {
				this.setState({isFocused: true});
				forward('onChange', {value}, this.props);
				ev.stopPropagation();
			}
		};

		handleBlur = () => {
			this.setState({isFocused: false});
		};

		handlePointerUp = () => {
			if (platform.touchscreen) {
				this.setState({isFocused: false});
			}
		};

		handleFocus = () => {
			if (!platform.touchscreen) {
				this.setState({isFocused: true});
			}
		};

		handleKeyDown = (ev, props) => {
			const {children, disabled, value: valueProp} = this.props;
			const value = ((valueProp || valueProp === 0) ? valueProp : children[0]);
			const index = children.findIndex(child => child === value);

			forward('onKeyDown', ev, props);

			if (!disabled) {
				if (isDown(ev.keyCode)) {
					this.handleClick(children[Math.max(index - 1, 0)])(ev);
				} else if (isUp(ev.keyCode)) {
					this.handleClick(children[Math.min(index + 1, children.length - 1)])(ev);
				}
			}
		};

		render () {
			const {children, max, min, value: valueProp, ...rest} = this.props;
			const value = ((valueProp || valueProp === 0) ? valueProp : (children && children[0]));

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
					onKeyDown={this.handleKeyDown}
					onPointerDown={this.handlePointerDown}
					onPointerUp={this.handlePointerUp}
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
