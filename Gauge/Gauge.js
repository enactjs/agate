/**
 * Provides Moonstone-themed dial-like gauge component.
 *
 * @example
 * <Gauge progress={0.5} backgroundProgress={0.75} />
 *
 * @module moonstone/Gauge
 * @exports Gauge
 * @exports GaugeBase
 * @exports GaugeDecorator
 */

import kind from '@enact/core/kind';
import ComponentOverride from '@enact/ui/ComponentOverride';
// import UiProgressBar from '@enact/ui/ProgressBar';
import Pure from '@enact/ui/internal/Pure';
import Slottable from '@enact/ui/Slottable';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Skinnable from '../Skinnable';

import Needle from './Needle';
import Ticks from './Ticks';

import componentCss from './Gauge.module.less';
// import needle from './assets/needle1.svg';


/**
 * Renders a moonstone-styled progress bar.
 *
 * @class GaugeBase
 * @memberof moonstone/Gauge
 * @ui
 * @public
 */
const GaugeBase = kind({
	name: 'Gauge',

	propTypes: /** @lends moonstone/Gauge.GaugeBase.prototype */ {
		counterclockwise: PropTypes.bool,
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `Gauge` - The root component class
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		degrees: PropTypes.number,

		/**
		 * Highlights the filled portion.
		 *
		 * @type {Boolean}
		 * @public
		 */
		highlighted: PropTypes.bool,

		horizonFlipMajorNumerals: PropTypes.bool,
		horizonFlipMinorNumerals: PropTypes.bool,
		levelMajorNumerals: PropTypes.bool,
		levelMinorNumerals: PropTypes.bool,

		/**
		 * Sets the orientation of the slider.
		 *
		 * * Values: `'horizontal'`, `'vertical'`
		 *
		 * @type {String}
		 * @default 'horizontal'
		 * @public
		 */
		orientation: PropTypes.oneOf(['radial']),

		/**
		 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
		 *
		 * @type {Number}
		 * @default 0
		 * @public
		 */
		progress: PropTypes.number,
		progressMinor: PropTypes.number,

		/**
		 * Enables the built-in tooltip.
		 *
		 * To customize the tooltip, pass either a custom tooltip component or an instance of
		 * [GaugeTooltip]{@link moonstone/Gauge.GaugeTooltip} with additional
		 * props configured.
		 *
		 * ```
		 * <Gauge
		 *   tooltip={
		 *     <GaugeTooltip side="after" />
		 *   }
		 * />
		 * ```
		 *
		 * The tooltip may also be passed as a child via the `"tooltip"` slot. See
		 * [Slottable]{@link ui/Slottable} for more information on how slots can be used.
		 *
		 * ```
		 * <Gauge>
		 *   <GaugeTooltip side="after" />
		 * </Gauge>
		 * ```
		 *
		 * @type {Boolean|Component|Element}
		 * @public
		 */
		readout: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.func]),

		startDegree: PropTypes.number,
		ticksMajor: PropTypes.number,
		ticksMajorNumerals: PropTypes.number,
		ticksMinor: PropTypes.number,
		ticksMinorNumerals: PropTypes.number
	},

	defaultProps: {
		degrees: 360,
		levelMajorNumerals: false,
		levelMinorNumerals: false,
		orientation: 'radial',
		progress: 0,
		progressMinor: 0,
		startDegree: 0,
		ticksMajor: 8,
		ticksMajorNumerals: 4,
		ticksMinor: 120,
		ticksMinorNumerals: 12
	},

	styles: {
		css: componentCss,
		className: 'gauge',
		publicClassNames: ['gauge']
	},

	computed: {
		className: ({highlighted, levelMajorNumerals, levelMinorNumerals, styler}) => styler.append({highlighted, levelMajorNumerals, levelMinorNumerals}),
		style: ({counterclockwise, degrees, startDegree, style}) => ({'--gauge-range-degrees': (degrees * (counterclockwise ? -1 : 1)), '--gauge-start-degree': startDegree, ...style}),
		ticksMajorNumerals: ({ticksMajorNumerals}) => (ticksMajorNumerals ? ['Empty', ...Array.from(Array(Math.max(0, ticksMajorNumerals - 1)).keys()).map(n => ++n), 'Full'] : null)
		// ticksMajorNumerals: ({ticksMajorNumerals}) => (ticksMajorNumerals ? ['Empty', ...Array.from(Array(Math.max(0, ticksMajorNumerals - 1)).keys()).map(n => (++n + '/' + ticksMajorNumerals)), 'Full'] : null)
	},

	render: ({
		counterclockwise,
		css,
		degrees,
		horizonFlipMajorNumerals,
		horizonFlipMinorNumerals,
		levelMajorNumerals,
		levelMinorNumerals,
		majorNumeralsTickOrientation,
		minorNumeralsTickOrientation,
		orientation,
		progress,
		progressMinor,
		readout,
		startDegree,
		ticksMajor,
		ticksMinor,
		ticksMajorNumerals,
		ticksMinorNumerals,
		...rest
	}) => {
		delete rest.highlighted;

		// console.log('gauge:', {css});

		return ([
			<div
				{...rest}
				key="base"
				css={css}
			>
				<Needle css={css} className={css.handMajor} scale={1} counterclockwise={counterclockwise} degrees={degrees} orientation={orientation} progress={progress} startDegree={startDegree} />
				<Needle css={css} className={css.handMinor} counterclockwise={counterclockwise} degrees={degrees} orientation={orientation} progress={progressMinor} startDegree={startDegree} />
				<Ticks css={css} className={css.ticksSubMinor} counterclockwise={counterclockwise} degrees={degrees} distance={110} startDegree={startDegree} />
				<Ticks css={css} className={css.ticksMinor} amount={ticksMinor} counterclockwise={counterclockwise} degrees={degrees} distance={150} startDegree={startDegree} />
				<Ticks css={css} className={css.ticksMajor} amount={ticksMajor} counterclockwise={counterclockwise} degrees={degrees} distance={150} startDegree={startDegree} />
				<Ticks css={css} className={css.ticksMinorNumerals} amount={ticksMinorNumerals} counterclockwise={counterclockwise} degrees={degrees} numerals tickOrientation={minorNumeralsTickOrientation} distance={140} startDegree={startDegree} />
				<Ticks css={css} className={css.ticksMajorNumerals} amount={ticksMajorNumerals} counterclockwise={counterclockwise} degrees={degrees} numerals tickOrientation={majorNumeralsTickOrientation} distance={120} startDegree={startDegree} />
				<ComponentOverride
					component={readout}
					orientation={orientation}
					percent
					proportion={progress}
					visible
				/>
			</div>,
			<div
				{...rest}
				key="leaf"
				css={css}
				className={rest.className + ' leaf'}
			>

				<div className={css.perspective}>
					<Ticks css={css} className={css.ticksMajor} amount={11} counterclockwise degrees={45} distance={230} startDegree={95} />
					<Ticks css={css} className={css.ticksMinor} amount={11} counterclockwise degrees={45} distance={248} startDegree={95} />
				</div>
				<div className={css.blocking} />
				<Ticks css={css} className={css.ticksMajorNumerals} amount={['Empty', '1/2', '100%']} counterclockwise degrees={45} numerals tickOrientation="level" distance={170} startDegree={95} />
				<Needle css={css} className={css.handMinor} counterclockwise degrees={45} orientation={orientation} progress={progressMinor} startDegree={95} />
				<Needle css={css} className={css.handMajor} scale={1} counterclockwise degrees={45} orientation={orientation} progress={progress} startDegree={95} />
			</div>
		]);
	}
});
// const GaugeBase = kind({
// 	name: 'Gauge',

// 	propTypes: /** @lends moonstone/Gauge.GaugeBase.prototype */ {
// 		counterclockwise: PropTypes.bool,
// 		/**
// 		 * Customizes the component by mapping the supplied collection of CSS class names to the
// 		 * corresponding internal Elements and states of this component.
// 		 *
// 		 * The following classes are supported:
// 		 *
// 		 * * `Gauge` - The root component class
// 		 *
// 		 * @type {Object}
// 		 * @public
// 		 */
// 		css: PropTypes.object,

// 		degrees: PropTypes.number,

// 		/**
// 		 * Highlights the filled portion.
// 		 *
// 		 * @type {Boolean}
// 		 * @public
// 		 */
// 		highlighted: PropTypes.bool,

// 		levelMajorNumerals: PropTypes.bool,
// 		levelMinorNumerals: PropTypes.bool,

// 		/**
// 		 * Sets the orientation of the slider.
// 		 *
// 		 * * Values: `'horizontal'`, `'vertical'`
// 		 *
// 		 * @type {String}
// 		 * @default 'horizontal'
// 		 * @public
// 		 */
// 		orientation: PropTypes.oneOf(['radial']),

// 		/**
// 		 * A number between `0` and `1` indicating the proportion of the filled portion of the bar.
// 		 *
// 		 * @type {Number}
// 		 * @default 0
// 		 * @public
// 		 */
// 		progress: PropTypes.number,

// 		/**
// 		 * Enables the built-in tooltip.
// 		 *
// 		 * To customize the tooltip, pass either a custom tooltip component or an instance of
// 		 * [GaugeTooltip]{@link moonstone/Gauge.GaugeTooltip} with additional
// 		 * props configured.
// 		 *
// 		 * ```
// 		 * <Gauge
// 		 *   tooltip={
// 		 *     <GaugeTooltip side="after" />
// 		 *   }
// 		 * />
// 		 * ```
// 		 *
// 		 * The tooltip may also be passed as a child via the `"tooltip"` slot. See
// 		 * [Slottable]{@link ui/Slottable} for more information on how slots can be used.
// 		 *
// 		 * ```
// 		 * <Gauge>
// 		 *   <GaugeTooltip side="after" />
// 		 * </Gauge>
// 		 * ```
// 		 *
// 		 * @type {Boolean|Component|Element}
// 		 * @public
// 		 */
// 		readout: PropTypes.oneOfType([PropTypes.bool, PropTypes.element, PropTypes.func]),

// 		startDegree: PropTypes.number,
// 		ticksMajor: PropTypes.number,
// 		ticksMajorNumerals: PropTypes.number,
// 		ticksMinor: PropTypes.number,
// 		ticksMinorNumerals: PropTypes.number
// 	},

// 	defaultProps: {
// 		degrees: 360,
// 		levelMajorNumerals: false,
// 		levelMinorNumerals: false,
// 		orientation: 'radial',
// 		progress: 0,
// 		startDegree: 0,
// 		ticksMajor: 8,
// 		ticksMajorNumerals: 4,
// 		ticksMinor: 120,
// 		ticksMinorNumerals: 12
// 	},

// 	styles: {
// 		css: componentCss,
// 		classNames: 'gauge',
// 		publicClassNames: ['gauge']
// 	},

// 	computed: {
// 		className: ({highlighted, levelMajorNumerals, levelMinorNumerals, styler}) => styler.append({highlighted, levelMajorNumerals, levelMinorNumerals}),
// 		style: ({counterclockwise, degrees, startDegree, style}) => ({'--gauge-range-degrees': (degrees * (counterclockwise ? -1 : 1)), '--gauge-start-degree': startDegree, ...style}),
// 		// ticksMajor: ({degrees, ticksMajor}) => (ticksMajor ? Array(degrees < 360 ? (ticksMajor + 1) : ticksMajor).fill(null).map((num, i) => <div key={'tick' + i} style={{'--tick-prop': ((i / ticksMajor) * degrees)}} /> ) : null),
// 		// ticksMinor: ({degrees, ticksMinor}) => (ticksMinor ? Array(degrees < 360 ? (ticksMinor + 1) : ticksMinor).fill(null).map((num, i) => <div key={'tick' + i} style={{'--tick-prop': ((i / ticksMinor) * degrees)}} /> ) : null),
// 		// ticksMajorNumerals: ({degrees, ticksMajorNumerals}) => (ticksMajorNumerals ? Array(degrees < 360 ? (ticksMajorNumerals + 1) : ticksMajorNumerals).fill(null).map((num, i) => <div key={'tick' + i} style={{'--tick-prop': ((i / ticksMajorNumerals) * degrees)}}>{i}</div> ) : null),
// 		// ticksMinorNumerals: ({degrees, ticksMinorNumerals}) => (ticksMinorNumerals ? Array(degrees < 360 ? (ticksMinorNumerals + 1) : ticksMinorNumerals).fill(null).map((num, i) => <div key={'tick' + i} style={{'--tick-prop': ((i / ticksMinorNumerals) * degrees)}}>{i}</div> ) : null)
// 		// ticksMajorNumerals: ({ticksMajorNumerals}) => (ticksMajorNumerals ? ['Empty', ...Array.from(Array(Math.max(0, ticksMajorNumerals - 1)).keys()).map(n => ++n), 'Full'] : null)
// 		ticksMajorNumerals: ({ticksMajorNumerals}) => (ticksMajorNumerals ? ['Empty', ...Array.from(Array(Math.max(0, ticksMajorNumerals - 1)).keys()).map(n => (++n + '/' + ticksMajorNumerals)), 'Full'] : null)
// 	},

// 	render: ({counterclockwise, css, degrees, levelMajorNumerals, levelMinorNumerals, orientation, progress, readout, startDegree, ticksMajor, ticksMinor, ticksMajorNumerals, ticksMinorNumerals, ...rest}) => {
// 		delete rest.highlighted;
// 		// delete rest.levelMajorNumerals;
// 		// delete rest.levelMinorNumerals;
// 		// delete rest.startDegree;

// 		return (
// 			<UiProgressBar
// 				{...rest}
// 				orientation={orientation}
// 				progress={progress}
// 				css={css}
// 			>
// 				<Ticks className={css.ticksSubMinor} counterclockwise={counterclockwise} degrees={degrees} distance={110} startDegree={startDegree} />
// 				<Ticks className={css.ticksMinor} amount={ticksMinor} counterclockwise={counterclockwise} degrees={degrees} distance={150} startDegree={startDegree} />
// 				<Ticks className={css.ticksMajor} amount={ticksMajor} counterclockwise={counterclockwise} degrees={degrees} distance={150} startDegree={startDegree} />
// 				<Ticks className={css.ticksMinorNumerals} amount={ticksMinorNumerals} counterclockwise={counterclockwise} degrees={degrees} numerals level={levelMinorNumerals} distance={140} startDegree={startDegree} />
// 				<Ticks className={css.ticksMajorNumerals} amount={ticksMajorNumerals} counterclockwise={counterclockwise} degrees={degrees} numerals level={levelMajorNumerals} distance={120} startDegree={startDegree} />
// 				{/* {ticksMinor ? <div className={css.ticksMinor}>{ticksMinor}</div> : null}*/}
// 				{/* {ticksMinorNumerals ? <div className={css.ticksMinorNumerals}>{ticksMinorNumerals}</div> : null}*/}
// 				{/* {ticksMajor ? <div className={css.ticksMajor}>{ticksMajor}</div> : null}*/}
// 				{/* {ticksMajorNumerals ? <div className={css.ticksMajorNumerals}>{ticksMajorNumerals}</div> : null}*/}
// 				<ComponentOverride
// 					component={readout}
// 					orientation={orientation}
// 					percent
// 					proportion={progress}
// 					visible
// 				/>
// 			</UiProgressBar>
// 		);
// 	}
// });

/**
 * Moonstone-specific behaviors to apply to [Gauge]{@link moonstone/Gauge.GaugeBase}.
 *
 * @hoc
 * @memberof moonstone/Gauge
 * @mixes moonstone/Skinnable.Skinnable
 * @public
 */
const GaugeDecorator = compose(
	Pure,
	Slottable({slots: ['readout']}),
	Skinnable
);

/**
 * The ready-to-use Moonstone-styled Gauge.
 *
 * @class Gauge
 * @memberof moonstone/Gauge
 * @extends moonstone/Gauge.GaugeBase
 * @mixes moonstone/Gauge.GaugeDecorator
 * @ui
 * @public
 */
const Gauge = GaugeDecorator(GaugeBase);


export default Gauge;
export {
	Gauge,
	GaugeBase,
	GaugeDecorator
};
