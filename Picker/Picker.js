import React, {Component} from 'react';
import Skinnable from '../Skinnable';

import css from './Picker.less';
import Touchable from '@enact/ui/Touchable';
import Spottable from '@enact/spotlight/Spottable';
import Spotlight from '@enact/spotlight';

import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import classNames from 'classnames';

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

	componentDidUpdate () {
		const isFirst = this.state.index <= 0;
		const isLast = this.state.index >= this.props.children.length - 1;

		if (isFirst) {
			this.handleSpotlightFocus(this.incrementRef);
		} else if (isLast) {
			this.handleSpotlightFocus(this.decrementRef);
		}
	}

	handleIncrement = () => {
		this.setState(({index}) => {
			const nextIndex = index + 1;
			if (nextIndex < this.props.children.length) {
				if (this.props.onChange) {
					this.props.onChange({index: index, value: this.props.children[index]});
				}
				return {index: nextIndex};
			}
		});
	}

	handleDecrement = () => {
		this.setState(({index}) => {
			const nextIndex = index - 1;
			if (nextIndex >= 0) {
				if (this.props.onChange) {
					this.props.onChange({index: index, value: this.props.children[index]});
				}
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

	handleSpotlightFocus = (node) => {
		Spotlight.focus(node);
	}

	getDecrementRef = (ref) => {
		if (ref && ref.node) {
			this.decrementRef = ref.node;
		}
	}

	getIncrementRef = (ref) => {
		if (ref && ref.node) {
			this.incrementRef = ref.node;
		}
	}

	render () {
		const {children: values, className, ...rest} = this.props;
		const isFirst = this.state.index <= 0;
		const isLast = this.state.index >= values.length - 1;

		return (
			<TouchableDiv {...rest} className={classNames(className, css.picker)} onFlick={this.handleFlick}>
				<SpottableDiv className={css.item} ref={this.getDecrementRef} onClick={this.handleDecrement} disabled={isFirst}>{isFirst ? '' : values[this.state.index - 1]}</SpottableDiv>
				<div className={`${css.item} ${css.currentIndex}`}>{values[this.state.index]}</div>
				<SpottableDiv className={css.item} ref={this.getIncrementRef} onClick={this.handleIncrement} disabled={isLast}>{isLast ? '' : values[this.state.index + 1]}</SpottableDiv>
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
