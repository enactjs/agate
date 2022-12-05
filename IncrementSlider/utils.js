import clamp from 'ramda/src/clamp';
import {adaptEvent, forward} from '@enact/core/handle';
import {calcProportion} from '@enact/ui/Slider/utils';

const calcStep = (knobStep, step) => {
	let s;

	if (knobStep != null) {
		s = knobStep;
	} else if (step != null) {
		s = step;
	}

	// default to a step of 1 if neither are set or are set to 0
	// otherwise, increment/decrement would be no-ops
	return s || 1;
};
export const emitChange = (direction) =>  adaptEvent(
	(ev, {knobStep, max, min, step, value = min}) => {
		const newValue = clamp(min, max, value + (calcStep(knobStep, step) * direction));

		return {
			value: newValue,
			proportion: calcProportion(min, max, newValue),
			type: 'onChange'
		};
	},
	forward('onChange')
);
