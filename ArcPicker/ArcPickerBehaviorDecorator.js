import kind from '@enact/core/kind';
import {forward} from '@enact/core/handle';
import hoc from '@enact/core/hoc';
import {validateRangeOnce} from '@enact/ui/internal/validators';
import PropTypes from 'prop-types';
import React from 'react';

const validateRange = validateRangeOnce((props) => props, {'component': 'ArcPickerBehaviorDecorator'});

/**
 * Adds Agate-specific ArcPicker behaviors.
 *
 * @class ArcPickerBehaviorDecorator
 * @hoc
 * @memberof agate/ArcPicker
 * @private
 */
const ArcPickerBehaviorDecorator = hoc((config, Wrapped) => {
	return kind({
		name: 'ArcPickerBehaviorDecorator',

		propTypes: /** @lends agate/ArcPicker.ArcPickerBehaviorDecorator.prototype */{
			/**
			 * The value options of ArcPicker.
			 *
			 * @type {Node}
			 * @required
			 * @public
			 */
			children: PropTypes.node.isRequired,

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
			onClick: (props) => (value) => (ev) => {
				forward('onChange', {value}, props);
				ev.stopPropagation();
			},
			value: ({value, children}) => ((value || value === 0) ? value : children[0])
		},

		render: ({max, min, value, ...rest}) => {
			delete rest.onChange;

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
