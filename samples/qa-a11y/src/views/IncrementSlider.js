/* eslint-disable react/jsx-no-bind */

import Button from '@enact/agate/Button';
import IncrementSlider from '@enact/agate/IncrementSlider';
import PropTypes from 'prop-types';
import {useState} from 'react';

import Section from '../components/Section';

const CustomIncrementSlider = ({customText, ...rest}) => {
	const [value, setValue] = useState(0);
	const valueText = `${customText} ${value}`;

	const handleChange = (ev) => setValue(ev.value);

	return (
		<IncrementSlider aria-valuetext={valueText} onChange={handleChange} value={value} {...rest} />
	);
};

CustomIncrementSlider.propTypes = {
	customText: PropTypes.string
};

const IncrementSliderView = () => (
	<>
		<Section title="Default">
			<IncrementSlider alt="Normal" />
			<IncrementSlider alt="Disabled" disabled />
		</Section>
		<br />
		<br />
		<Section title="Aria-ValueText">
			<CustomIncrementSlider alt="Aria-valuetext" customText="This is Volume" />
			<CustomIncrementSlider alt="Aria-valuetext and disabled" customText="This is Volume" disabled />
		</Section>
		<br />
		<br />
		<Button>To Escape to the Left via 5-way Left</Button>
	</>
);

export default IncrementSliderView;
