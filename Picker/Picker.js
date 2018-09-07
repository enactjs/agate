import React, {Component} from 'react';
import Skinnable from '../Skinnable';

import css from './Picker.less';
import Touchable from '@enact/ui/Touchable';
import Spottable from '@enact/spotlight/Spottable';
import compose from 'ramda/src/compose';

import PropTypes from 'prop-types';

const TouchableDiv = Touchable('div');
const SpottableDiv = Spottable('div');

class PickerBase extends Component {
	static propTypes = {
		onChange: PropTypes.func
	}

	constructor (props) {
		super(props);
		this.state = {
			index: 0
		};
	}

	handleIncrement = () => {
		this.setState(({index}) => {
			const nextIndex = index + 1;
			if (nextIndex < this.props.children.length) {
				this.props.onChange({index: index, value: this.props.children[index]});
				return {index: nextIndex};
			}
		});
	}

	handleDecrement = () => {
		this.setState(({index}) => {
			const nextIndex = index - 1;
			if (nextIndex >= 0) {
				this.props.onChange({index: index, value: this.props.children[index]});
				return {index: nextIndex};
			}
		});
	}

	handleFlick = (ev) => {
		if (ev.direction === 'vertical') {
			if (ev.velocityX > ev.velocityY) {
				this.handleIncrement();
			} else if (ev.velocityX < ev.velocityY) {
				this.handleDecrement();
			}
		}
	}

	render () {
		const {children: values, className, ...rest} = this.props;

		return (
			<TouchableDiv {...rest} className={`${className} ${css.picker}`} onFlick={this.handleFlick}>
				<SpottableDiv className={css.item} onClick={this.handleDecrement}>{this.state.index > 0 ? values[this.state.index - 1] : ''}</SpottableDiv>
				<div className={`${css.item} ${css.currentIndex}`}>{values[this.state.index]}</div>
				<SpottableDiv className={css.item} onClick={this.handleIncrement}>{this.state.index < values.length - 1 ? values[this.state.index + 1] : ''}</SpottableDiv>
			</TouchableDiv>
		);
	}
}

const PickerDecorator = compose(
	Skinnable
);

const Picker = PickerDecorator(PickerBase);

export default Picker;

export {
	Picker,
	PickerBase,
	PickerDecorator
};
