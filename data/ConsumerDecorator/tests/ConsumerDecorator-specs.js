import '@testing-library/jest-dom';
import {render} from '@testing-library/react';
import compose from 'ramda/src/compose';

import ConsumerDecorator from '../ConsumerDecorator';
import {AppContext, ProviderDecorator} from '../../ProviderDecorator';

let componentAProps = [];
let componentBProps = [];

const componentAState = {
	componentAState: 'componentAState'
};
const componentBState = {
	componentBState: 'componentBState'
};

const BaseComponentA = (props) => {
	componentAProps = props;

	return <AppContext.Provider value="defaultValue"><div /></AppContext.Provider>;
}

const ComponentADecorator = compose(
	ProviderDecorator({
		state: componentAState
	}),
	ConsumerDecorator({
		handlers: {
			defaultHandler: jest.fn()
		},
		// added for code coverage purposes. `mount` is not accessible through props
		mount: () => {},
		mapStateToProps: () => ({
			defaultState: componentAState.componentAState
		})
	})
);

const ComponentA = ComponentADecorator(BaseComponentA);

// ComponentB created for testing `mapStateToProps` defined as an object
const BaseComponentB = (props) => {
	componentBProps = props;

	return <AppContext.Provider value="test"><div /></AppContext.Provider>;
};

const ComponentBDecorator = compose(
	ProviderDecorator({
		state: componentBState
	}),
	ConsumerDecorator({
		mapStateToProps: {
			stringProp: 'stringProp',
			functionProp: jest.fn(() => 'functionProp')
		}
	})
);

const ComponentB = ComponentBDecorator(BaseComponentB);

describe('ConsumerDecorator specs', () => {
	test('should pass a handler to the wrapped component', () => {
		render(<ComponentA />);

		const expected = 'function';
		const actual = typeof componentAProps.defaultHandler;

		expect(actual).toBe(expected);
	});

	test('should pass the `componentAState` state to props to the wrapped component', () => {
		render(<ComponentA />);

		const expected = 'componentAState';
		const actual = componentAProps.defaultState;

		expect(actual).toBe(expected);
	});

	test('should pass the state to props if the type is function', () => {
		render(<ComponentB />);

		const actual = componentBProps.functionProp;

		expect(actual).not.toBe(null);
	});

	test('should not pass the state to props if the type is not function', () => {
		render(<ComponentB />);

		const actual = componentBProps.stringProp;

		// eslint-disable-next-line no-undefined
		expect(actual).toBe(undefined);
	});
});
