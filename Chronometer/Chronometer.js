/**
 * An HOC to read and report the current time.
 *
 * @example
 * Chronometer(Clock)
 *
 * @module agate/Chronometer
 * @exports Chronometer
 */

import hoc from '@enact/core/hoc';
import React from 'react';

const defaultConfig = {
	// How frequently the date prop will update. Accepts strings and numbers. Strings, being 'second', 'minute', 'halfhour', 'hour', 'day'; and number being a literal amount of miliseconds.
	tickFrequency: 'minute',
	// The fastest possible time that an update could occur. Half second ensures that a tick will
	// fire closer to when the real second ticks on the clock. Defaults to half of the tickFrequency.
	minimumFrequency: 500
};

const Chronometer = hoc(defaultConfig, (config, Wrapped) => {
	const frequencies = {
		day: (24 * 60 * 60 * 1000),
		hour: (60 * 60 * 1000),
		halfhour: (30 * 60 * 1000),
		minute: (60 * 1000),
		second: 1000
	};

	return class extends React.Component {
		static displayName = 'Chronometer';
		constructor (props) {
			super(props);

			const date = new Date();
			this.previousTick = date.getTime();
			this.state = {
				date
			};

			// Check every half second for an update to the clock
			this.ticker = window.setInterval(this.update, config.minimumFrequency);
		}
		componentWillUnmount () {
			window.clearInterval(this.ticker);
		}
		update = () => {
			const date = new Date();
			const time = date.getTime();
			const interval = typeof config.tickFrequency === 'number' ? config.tickFrequency : frequencies[config.tickFrequency];
			const previousOnTheInterval = (this.previousTick - (this.previousTick % interval));
			// If we're within the range of a new tick frequency, fire a state update.
			// Accepts a string for shorthand or miliseconds
			if (previousOnTheInterval + frequencies[config.tickFrequency] < time ||
				typeof config.tickFrequency === 'number' && previousOnTheInterval + config.tickFrequency < time
			) {
				// console.log('updating chronometer on the ', config.tickFrequency, 'at', date);
				this.previousTick = time;
				this.setState({date});
			}
		}
		render () {
			return (
				<Wrapped {...this.props} date={this.state.date} />
			);
		}
	};
});

export default Chronometer;
