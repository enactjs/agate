import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';
import {AppContext, ProviderDecorator} from '../ProviderDecorator';
import {Component, createContext} from 'react';
import ConsumerDecorator from '../../ConsumerDecorator';
import compose from 'ramda/src/compose';

// const blur = (elem) => fireEvent.blur(elem);
// const focus = (elem) => fireEvent.focus(elem);

const componentState = {
	firstState: 'firstState'
}

let data = [];

const Context = createContext();

class BaseDiv extends Component {
	constructor (props) {
		super (props);
	}

	render () {
		data = this.props;
		// console.log(data);

		const context = {
			state: componentState,
			updateAppState: jest.fn()
		};

		return (
			<Context.Provider value={context}>
				<div>test</div>
			</Context.Provider>
		);
	}
}

const DivDecorator = compose(
	ProviderDecorator({
		state: componentState,
		pauseOnBlur: false
	}),
	// tried to check if `updateAppState` is covered
	// ConsumerDecorator({
	// 	mapStateToProps: ({state, pauseOnBlur}) => ({
	// 		defaultState: state,
	// 		defaultPauseOnBlur: pauseOnBlur
	// 	}),
	// 	handlers: {
	// 		handleUpdate: ({update}) => {
	// 			console.log('updateTest', update);
	// 			update(state => {
	// 				state.firstState += ' !';
	// 			})
	// 		}
	// 	}
	// })
);
const Div = DivDecorator(BaseDiv);
// const Div = ProviderDecorator({
// 	state: componentState,
// 	pauseOnBlur: false
// }, BaseDiv);

describe('ProviderDecorator specs', () => {

	let windowSpy;

	beforeEach(() => {
		windowSpy = jest.spyOn(window, 'window', 'get');
	});

	afterEach(() => {
		windowSpy.mockRestore();
	});
	test('initial test', () => {
		render(<Div />);
		// screen.debug();
	});

	// try covering handleBlur handler
	test('blur', () => {
		const handleBlur = jest.fn();
		render(<Div onBlur={handleBlur} />);
		const elem = screen.getByText('test').parentElement;
		// screen.debug(elem);
		windowSpy.mockImplementation(() => ({
			focused: null
		}));
		fireEvent.focus(elem)
		console.log(window);
		// expect(handleBlur).toHaveBeenCalled();
	});
});







// class BaseDiv extends Component {
// 	constructor (props) {
// 		super (props);
// 	};
//
// 	componentDidMount () {
// 	};
//
// 	componentWillUnmount () {
// 	};
//
// 	render () {
// 		data = this.props;
// 		console.log(this.props);
//
// 		return <AppContext.Provider value='defaultValue'><div {...this.props} /></AppContext.Provider>;
// 	}
// }
//
// const Div = ProviderDecorator({
// 	state: componentState,
// 	pauseOnBlur: false
// }, BaseDiv);
//
// describe('ProviderDecorator specs', () => {
// 	test('initial test', () => {
// 		render(<Div />);
// 	});
// });

// const BaseDiv = (props) => {
// 	data = props;
// 	console.log(data);
//
// 	return <div />;
// };
