import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import React from 'react';

import Arc from '../Arc';
import ArcPickerBehaviorDecorator from './ArcPickerBehaviourDecorator';
import Skinnable from '../Skinnable';

import css from './ArcPicker.module.less';

/**
 * An Agate component for displaying fan speed {@link agate/ArcPicker}.
 *
 * @class ArcPickerBase
 * @memberof agate/ArcPicker
 * @ui
 * @private
 */
const ArcPickerBase = kind({
	name: 'ArcPickerBase',

	propTypes: /** @lends agate/ArcPicker.ArcPickerBase.prototype */ {
		/**
		 * The value options of ArcPicker.
		 *
		 * @type {Array}
		 * @public
		 */
		options: PropTypes.array.isRequired,

		/**
		 * The end angle(in degrees) of the arc.
		 *
		 * The value should be between 0 and 360 and should be greater than startAngle.
		 *
		 * @type {number}
		 * @default 310
		 * @public
		 */
		endAngle: PropTypes.number,

		/**
		 * Called when the path area is clicked.
		 *
		 * @type {Function}
		 * @param {Object} event
		 * @public
		 */
		onClick: PropTypes.func,

		/**
		 * The selection type of ArcPicker.
		 *
		 * @type {String}
		 * @public
		 */
		selectionType: PropTypes.oneOf(['single', 'cumulative']),

		/**
		 * Called to set the value of ArcPicker.
		 *
		 * @type {Function}
		 * @public
		 */
		setValue: PropTypes.func,

		/**
		 * Current skinVariant.
		 *
		 * @type {Object}
		 * @public
		 */
		skinVariants: PropTypes.object,

		/**
		 * The start angle(in degrees) of the arc.
		 *
		 * The value should be between 0 and 360.
		 *
		 * @type {number}
		 * @default 50
		 * @public
		 */
		startAngle: PropTypes.number,

		/**
		 * Value of ArcPicker.
		 *
		 * @type {Number}
		 * @public
		 */
		value: PropTypes.number
	},

	defaultProps: {
		endAngle: 310,
		startAngle: 50
	},

	styles: {
		css,
		className: 'arcPicker'
	},

	computed: {
		renderArcSegments: (props) => {
			const {endAngle, onClick, options, selectionType, skinVariants, startAngle, value} = props;

			return (
				options.map((option, index) => {
				// Calc `arcStartAngle`, `arcEndAngle` based on `startAngle` and `endAngle` for every <Arc />
					const pauseAngle = 2;
					const arcSegments = options.length;
					let arcStartAngle = startAngle + (endAngle - startAngle) / arcSegments * index;
					let arcEndAngle = startAngle + (endAngle - startAngle) / arcSegments * (index + 1) - pauseAngle;

					const opacity = () => {
						if (selectionType === 'cumulative') {
							return value >= option ? 1 : 0.4;
						} else {
							return value === option ? 1 : 0.4;
						}
					};

					return (
						<Arc
							className={css.fanSpeedArc}
							color={skinVariants.night ? '#fff' : '#000'}
							endAngle={arcEndAngle}
							key={index}
							onClick={onClick(option)}
							opacity={opacity()}
							radius={150}
							startAngle={arcStartAngle}
							strokeWidth={5}
						/>
					);
				}));
		}
	},

	render: ({children, renderArcSegments, ...rest}) => {
		delete rest.endAngle;
		delete rest.options;
		delete rest.selectionType;
		delete rest.setValue;
		delete rest.skinVariants;
		delete rest.startAngle;
		delete rest.value;

		return (
			<div className={css.arcPicker} {...rest}>
				{renderArcSegments}
				<div className={css.valueDisplay}>
					{children}
				</div>
			</div>
		);
	}
});

const ArcPickerDecorator = compose(
	ArcPickerBehaviorDecorator,
	Skinnable({variantsProp: 'skinVariants'})
);

const ArcPicker = ArcPickerDecorator(ArcPickerBase);

export default ArcPicker;
export {
	ArcPicker,
	ArcPickerBase
};
