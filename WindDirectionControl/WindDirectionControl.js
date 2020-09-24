import classnames from 'classnames';
import React from 'react';

import ArcPicker from '../ArcPicker';
import Icon from '../Icon';
import Skinnable from '../Skinnable';

import css from './WindDirectionControl.module.less';

/**
 * An Agate component for displaying Wind Direction Control {@link agate/WindDirectionControl}.
 *
 * @class WindDirectionControl
 * @memberof agate/WindDirectionControl
 * @ui
 * @private
 */
const WindDirectionControlBase = class extends React.Component{
	static displayName = 'WindDirectionControlBase';

	constructor (props) {
		super(props);

		this.state = {
			currentValue: 'airDown'
		};
	}

	setValue = (value) => {
		this.setState({
			currentValue: value
		});
	};

	componentIcon = () => {
		const {currentValue} = this.state;

		switch (currentValue) {
			case 'airDown':
				return 'airdown';
			case 'airRight':
				return 'airup';
			case 'airUp':
				return 'airright';
		}
	};

	render() {
		const options = ['airDown', 'airRight', 'airUp'];
		const {currentValue} = this.state;
		const {setValue} = this;
		const {className} = this.props;

		return (
			<div className={classnames(className, css.windDirectionControl)}>
				<ArcPicker
					endAngle={210}
					options={options}
					setValue={setValue}
					value={currentValue}
				>
					<Icon className={css.airDirectionIcon} css={css}>{this.componentIcon()}</Icon>
				</ArcPicker>
			</div>
		);
	}
};

/**
 * Applies Agate specific behaviors to [WindDirectionControl]{@link agate/WindDirectionControl.WindDirectionControlBase} components.
 *
 * @hoc
 * @memberof agate/WindDirectionControl
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const WindDirectionControl = Skinnable({variantsProp: 'skinVariants'})(WindDirectionControlBase);

export default WindDirectionControl;
export {
	WindDirectionControl,
	WindDirectionControlBase
};
