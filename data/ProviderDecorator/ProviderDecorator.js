import hoc from '@enact/core/hoc';
import {produce} from 'immer';
import React, {Component} from 'react';

const Context = React.createContext();

const ProviderDecorator = hoc({state: {}}, (config, Wrapped) => {
	const {state: defaultState} = config;

	const PureWrapped = React.memo(Wrapped);

	return class extends Component {
		static displayName = 'ProviderDecorator'

		constructor (props) {
			super(props);
			this.state = defaultState;
		}

		updateAppState = (cb) => {
			this.setState(produce(cb));
		};

		getState (state) {
			if (__DEV__) {
				return Object.freeze(
					Object.keys(state).reduce((acc, key) => {
						if (typeof state[key] === 'object') {
							acc[key] = this.getState(state[key]);
						} else {
							acc[key] = state[key];
						}

						return acc;
					}, {})
				);
			}

			return state;
		}

		render () {
			const context = {
				state: this.getState(this.state),
				updateAppState: this.updateAppState
			};

			return (
				<Context.Provider value={context}>
					<PureWrapped {...this.props} />
				</Context.Provider>
			);
		}
	};
});

export default ProviderDecorator;
export {
	ProviderDecorator,
	Context as AppContext
};
