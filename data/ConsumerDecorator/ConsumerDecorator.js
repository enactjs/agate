import hoc from '@enact/core/hoc';
import React, {Component} from 'react';

// data provider things
import {AppContext} from '../ProviderDecorator';

const defaultConfig = {
	// Each handler receives the event payload, the current props, and an API
	// object with the current state and an update method. This structure
	// mirrors the core/kind handlers block allowing authors to use core/handle.
	handlers: null,

	// Each function receives the current state and props and returns a value to
	// be passed to the wrapped component in the given prop.
	// Altneratively accepts a function which receives the current state and props and
	// returns a props object to merge with the current props.
	mapStateToProps: null
};

const ConsumerDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {handlers, mapStateToProps, mount} = config;

	let mapper = () => null;

	if (typeof mapStateToProps === 'function') {
		mapper = mapStateToProps;
	} else if (mapStateToProps) {
		const keys = Object.keys(mapStateToProps).filter(key => typeof mapStateToProps[key] === 'function');
		mapper = (state, props) => keys.reduce((updated, prop) => {
			updated[prop] = mapStateToProps[prop](state, props);
			return updated;
		}, {});
	}

	return class extends Component {
		static displayName = 'ConsumerDecorator';

		static contextType = AppContext;

		constructor () {
			super();

			this.handlers = handlers ? Object.keys(handlers).reduce((obj, key) => {
				obj[key] = (ev) => {
					handlers[key](ev, this.props, this.getContext());
				};

				return obj;
			}, {}) : null;
		}

		componentDidMount () {
			if (mount) {
				this.unmountCallback = mount(this.props, this.getContext());
			}
		}

		componentWillUnmount () {
			if (this.unmountCallback) {
				this.unmountCallback(this.props, this.getContext());
			}
		}

		getContext () {
			return {
				state: this.context.state,
				update: this.context.updateAppState
			};
		}

		render () {
			const props = {
				...this.props,
				...mapper(this.context.state, this.props),
				...this.handlers
			};

			return (
				<Wrapped {...props} />
			);
		}
	};
});

export default ConsumerDecorator;
export {ConsumerDecorator};
