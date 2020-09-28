import kind from '@enact/core/kind';
import {forward, handle} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {validateRangeOnce} from '@enact/ui/internal/validators';
import PropTypes from 'prop-types';
import React from 'react';

const validateRange = validateRangeOnce((props) => props, {'component': 'ArcPickerBehaviorDecorator'});

/**
 * Adds Agate-specific ArcPicker behaviors.
 *
 * @class ArcPickerBehaviorDecorator
 * @memberof agate/ArcPicker
 * @hoc
 * @public
 */
const ArcPickerBehaviorDecorator = hoc((config, Wrapped) => {
	return kind({
		name: 'ArcPickerBehaviorDecorator',

		propTypes: {
			/**
			 * The value options of ArcPicker.
			 *
			 * @type {Array}
			 * @public
			 */
			values: PropTypes.array.isRequired,

			/**
			 * The maximum value of ArcPicker.
			 *
			 * @type {Number}
			 * @public
			 */
			max: PropTypes.number,

			/**
			 * The min value of ArcPicker.
			 *
			 * @type {Number}
			 * @public
			 */
			min: PropTypes.number,

			/**
			 * Called when value is changed.
			 *
			 * @type {Function}
			 * @public
			 */
			onChange: PropTypes.func,

			/**
			 * Called when the path area is clicked.
			 *
			 * @type {Function}
			 * @param {Object} event
			 * @public
			 */
			onClick: PropTypes.func,

			/**
			 * Value of ArcPicker.
			 *
			 * @type {Number|String}
			 * @public
			 */
			value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
		},

		computed: {
			onClick: ({onChange}) => (value) => (ev) => {
				onChange({value});
				ev.stopPropagation();
			},
			value: ({value, values}) => ((value || value === 0) ? value : values[0])
		},

		render ({max, min, value, ...rest}) {
			delete rest.rest;

			if (__DEV__) {
				const valueProps = {value, max, min};

				validateRange(valueProps);
			}

			return (
				<Wrapped {...rest} value={value} />
			);
		}
	});
});

export default ArcPickerBehaviorDecorator;
export {
	ArcPickerBehaviorDecorator
};
