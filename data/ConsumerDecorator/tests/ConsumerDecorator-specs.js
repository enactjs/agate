import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import compose from 'ramda/src/compose';

import ConsumerDecorator from '../ConsumerDecorator';
import {AppContext, ProviderDecorator} from '../../ProviderDecorator';

let data = [];

const componentAState = {
	firstState: 'firstState',
	secondState: 'secondState'
};

const BaseComponentA = (props) => {

	data = props;
	console.log(data);
	console.log(typeof data.secondhandler);

	return <AppContext.Provider value="test"><div {...props} /></AppContext.Provider>;
};

const ComponentDecorator = compose(
	ProviderDecorator({
		state: componentAState
	}),
	ConsumerDecorator({
		mapStateToProps: function () {
			return {
				firsthandler: () => {
					return {
						firstHandler: 'firstHandler'
					};
				},
				secondhandler: 'secondHandler'
			};
		}
	})
);

const ComponentA = ComponentDecorator(BaseComponentA);

describe('ConsumerDecorator specs', () => {
	test('initial test', () => {
		render(<ComponentA />);
	});
});