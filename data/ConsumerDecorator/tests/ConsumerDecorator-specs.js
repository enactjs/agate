import {render, screen} from '@testing-library/react';

import ConsumerDecorator from '../ConsumerDecorator';

let data = [];

const componentAState = {
	firstState: 'firstState',
	secondState: 'secondState'
}

const BaseComponentA = (props) => {
	data = props;
	console.log(data);

	return <div {...props} />
};

const ComponentA = ConsumerDecorator({
	mapStateToProps: {
		firstStateProp: componentAState.firstState,
		secondStateProp: componentAState.secondState
	}
}, BaseComponentA)

describe('ConsumerDecorator specs', () => {
	test('initial test', () => {
		render(<ComponentA />);
		screen.debug();
	});
});