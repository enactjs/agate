import {adaptEvent, forEventProp, forward, handle, oneOf} from '@enact/core/handle';
import kind from '@enact/core/kind';
import Spottable from '@enact/spotlight/Spottable';
import Changeable from '@enact/ui/Changeable';
import Touchable from '@enact/ui/Touchable';
import PropTypes from 'prop-types';
import clamp from 'ramda/src/clamp';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import css from './Picker.less';

const PickerRoot = Touchable('div');
const PickerButtonItem = Spottable('div');

const handleChange = direction => handle(
	adaptEvent(
		(ev, {value, children}) => ({
			value: clamp(0, React.Children.count(children) - 1, value + direction)
		}),
		forward('onChange')
	)
);
const increment = handleChange(1);
const decrement = handleChange(-1);

const PickerBase = kind({
	name: 'Picker',

	propTypes: {
		value: PropTypes.number
	},

	defaultProps: {
		value: 0
	},

	styles: {
		css,
		className: 'picker'
	},

	handlers: {
		handleDecrement: decrement,
		handleFlick: handle(
			forEventProp('direction', 'vertical'),
			// ignore "slow" flicks by filtering out velocity below a threshold
			oneOf(
				[({velocityY}) => velocityY < 0, increment],
				[({velocityY}) => velocityY > 0, decrement]
			)
		),
		handleIncrement: increment
	},

	computed: {
		activeClassName: ({styler}) => styler.join('active', 'item')
	},

	render: (props) => {
		const {activeClassName, children: values, handleDecrement, handleFlick, handleIncrement, value, ...rest} = props;
		const isFirst = value <= 0;
		const isLast = value >= React.Children.count(values) - 1;

		return (
			<PickerRoot {...rest} onFlick={handleFlick}>
				<PickerButtonItem
					className={css.item}
					onClick={handleDecrement}
					disabled={isFirst}
				>
					{isFirst ? '' : values[value - 1]}
				</PickerButtonItem>
				<div className={activeClassName}>
					{values[value]}
				</div>
				<PickerButtonItem
					className={css.item}
					onClick={handleIncrement}
					disabled={isLast}
				>
					{isLast ? '' : values[value + 1]}
				</PickerButtonItem>
			</PickerRoot>
		);
	}
});

const PickerDecorator = compose(
	Changeable,
	Skinnable
);

const Picker = PickerDecorator(PickerBase);

export default Picker;

export {
	Picker,
	PickerBase,
	PickerDecorator
};
