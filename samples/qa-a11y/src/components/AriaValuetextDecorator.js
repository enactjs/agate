/* eslint-disable react/jsx-no-bind */

import hoc from '@enact/core/hoc';
import PropTypes from 'prop-types';
import React from 'react';

const AriaValuetextDecorator  = hoc((config, Wrapped) => {
	let defaultValue;
	if (config) {
		defaultValue = config.value;
	} else {
		defaultValue = 1;
	}

	// eslint-disable-next-line no-shadow
	function AriaValuetextDecorator ({'aria-valuetext': ariaValueText, ...rest}) {
		const [value, setValue] = React.useState(defaultValue);
		const valueText = `${ariaValueText} ${value}`;

		const handleChange = (ev) => setValue(ev.value);

		return (
			<Wrapped aria-valuetext={valueText} onChange={handleChange} value={value} {...rest} />
		);
	}

	AriaValuetextDecorator.propTypes = {
		'aria-valuetext': PropTypes.string
	};

	return AriaValuetextDecorator;
});

export default AriaValuetextDecorator;
export {
	AriaValuetextDecorator
};
