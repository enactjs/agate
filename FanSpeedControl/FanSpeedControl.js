import classnames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import ArcPicker from '../ArcPicker';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './FanSpeedControl.module.less';

/**
 * An Agate component for displaying fan speed {@link agate/FanSpeedControl}.
 *
 * @class FanSpeedControlBase
 * @memberof agate/ArcPicker
 * @ui
 * @private
 */
const FanSpeedControlBase = class extends React.Component {
	static displayName = 'FanSpeedControlBase';

	static propTypes = /** @lends agate/FanSpeedControl.FanSpeedControlBase.prototype */ {
		/**
		 * ArcPicker icon.
		 *
		 * @type {String}
		 * @public
		 */
		icon: PropTypes.string,

		/**
		 * Called when the path area is clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		max: PropTypes.number,

		/**
		 * The maximum size of ArcPicker. The number of arc segments to be rendered.
		 *
		 * @type {Number}
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * Current skinVariant.
		 *
		 * @type {Object}
		 * @public
		 */
		skinVariants: PropTypes.object,

		/**
		 * Value of ArcPicker.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	};

	constructor (props) {
		super(props);

		this.state = {
			currentValue: 2
		};
	}

	setValue = (value) => {
		this.setState({
			currentValue: value
		});
	};

	render () {
		const {setValue} = this;
		const {className, icon, max} = this.props;
		const {currentValue} = this.state;
		const options = [];

		for (let i = 1; i <= max; i++) {
			options.push(i);
		}

		return (
			<div className={classnames(className, css.fanSpeedControl)}>
				<ArcPicker
					endAngle={312}
					max={max}
					options={options}
					selectionType="cumulative"
					setValue={setValue}
					value={currentValue}
				>
					<Icon className={css.fanIcon} css={css}>{icon}</Icon>
					<span className={css.fanValue}>{currentValue}</span>
				</ArcPicker>
			</div>
		);
	}
};

const FanSpeedControl = Skinnable({variantsProp: 'skinVariants'})(FanSpeedControlBase);

export default FanSpeedControl;
export {
	FanSpeedControl,
	FanSpeedControlBase
};
