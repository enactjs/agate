import freeze from 'deep-freeze';
import {on, off} from '@enact/core/dispatcher';
import hoc from '@enact/core/hoc';
import {produce} from 'immer';
import React, {Component} from 'react';

const Context = React.createContext();

const defaultConfig = {
	pauseOnBlur: false,
	state: {}
};

const ProviderDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {pauseOnBlur, state: defaultState} = config;

	const PureWrapped = React.memo(Wrapped);

	return class extends Component {
		static displayName = 'ProviderDecorator';

		constructor (props) {
			super(props);
			this.state = defaultState;
			this.focused = true;
			this.queue = [];
		}

		componentDidMount () {
			if (pauseOnBlur) {
				on('blur', this.handleBlur, window);
				on('focus', this.handleFocus, window);
			}
		}

		componentWillUnount () {
			if (pauseOnBlur) {
				off('blur', this.handleBlur, window);
				off('focus', this.handleFocus, window);
			}
		}

		handleBlur = () => {
			this.focused = false;
		};

		handleFocus = () => {
			this.focused = true;

			while (this.queue.length) {
				this.setState(this.queue.shift());
			}
		};

		updateAppState = (cb) => {
			const updater = produce(cb);

			if (this.focused) {
				this.setState(updater);
			} else {
				this.queue.push(updater);
			}
		};

		getState () {
			if (__DEV__) {
				return freeze(this.state);
			}

			return this.state;
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
