/* eslint-disable react/jsx-no-bind */

import Picker from '@enact/agate/Picker';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import {useState} from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const SpotlightContainerSection = SpotlightContainerDecorator({enterTo: 'default-element', preserveId: true}, Section);

const
	airports = [
		'San Francisco Airport Terminal Gate 1',
		'Boston Airport Terminal Gate 2',
		'Tokyo Airport Terminal Gate 3',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	],
	subjects = ['English', 'Maths', 'Korean', 'Science', 'History'],
	subjectValue = ['80', '90', '100', '70', '50'];

const CustomPicker = (props) => {
	const [index, setIndex] = useState(0);

	const handleChange = (ev) => setIndex({index: ev.value});
	const valueText = `${props.children[index]} ${subjectValue[index]}`;

	return (
		<Picker {...props} aria-valuetext={valueText} onChange={handleChange} />
	);
};

const PickerView = () => (
	<>
		<h2>Default</h2>

		<Section title="Horizontal">
			<Picker
				alt="Horizontal"
				orientation="horizontal"
				width="large"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal and Disabled"
				disabled
				orientation="horizontal"
				width="large"
			>
				{airports}
			</Picker>
		</Section>

		<SpotlightContainerSection className={appCss.marginTop} horizontal title="Vertical">
			<Picker
				alt="Vertical"
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Disabled"
				disabled
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>
		</SpotlightContainerSection>

		<h2 className={appCss.headerMarginTop}>decrementAriaLabel and incrementAriaLabel</h2>

		<Section className={appCss.marginTop} title="Horizontal">
			<Picker
				alt="Horizontal"
				decrementAriaLabel="This is a Label 1."
				incrementAriaLabel="This is a Label 2."
				orientation="horizontal"
				width="large"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal and Disabled"
				decrementAriaLabel="This is a Label 1."
				disabled
				incrementAriaLabel="This is a Label 2."
				orientation="horizontal"
				width="large"
			>
				{airports}
			</Picker>
		</Section>

		<SpotlightContainerSection className={appCss.marginTop} horizontal title="Vertical">
			<Picker
				alt="Vertical"
				decrementAriaLabel="Decrement"
				incrementAriaLabel="Increment"
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Disabled"
				decrementAriaLabel="Decrement"
				disabled
				incrementAriaLabel="Increment"
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>
		</SpotlightContainerSection>

		<h2 className={appCss.headerMarginTop}>Aria-labelled</h2>

		<Section className={appCss.marginTop} title="Horizontal">
			<Picker
				alt="Horizontal"
				aria-label="This is a Label 0."
				orientation="horizontal"
				width="large"
			>
				{airports}
			</Picker>

			<Picker
				alt="Horizontal and Disabled"
				aria-label="This is a Label 1."
				disabled
				orientation="horizontal"
				width="large"
			>
				{airports}
			</Picker>
		</Section>

		<SpotlightContainerSection className={appCss.marginTop} horizontal title="Vertical">
			<Picker
				alt="Vertical"
				aria-label="This is a Label 4."
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>

			<Picker
				alt="Vertical and Disabled"
				aria-label="This is a Label 6."
				disabled
				orientation="vertical"
				width="medium"
			>
				{airports}
			</Picker>
		</SpotlightContainerSection>

		<h2 className={appCss.headerMarginTop}>Aria-labelled based on selected Item</h2>

		<Section className={appCss.marginTop} title="Aria-labelled based on selected Item">
			<CustomPicker
				alt="Horizontal"
				orientation="horizontal"
				width="large"
			>
				{subjects}
			</CustomPicker>
			<CustomPicker
				alt="Horizontal and Disabled"
				disabled
				orientation="horizontal"
				width="large"
			>
				{subjects}
			</CustomPicker>
		</Section>

		<Section className={appCss.marginTop} title="With decrementAriaLabel and incrementAriaLabel">
			<CustomPicker
				alt="Horizontal"
				decrementAriaLabel="Decrement"
				incrementAriaLabel="Increment"
				orientation="horizontal"
				width="large"
			>
				{subjects}
			</CustomPicker>

			<CustomPicker
				alt="Horizontal and Disabled"
				decrementAriaLabel="Decrement"
				disabled
				incrementAriaLabel="Increment"
				orientation="horizontal"
				width="large"
			>
				{subjects}
			</CustomPicker>
		</Section>
	</>
);

export default PickerView;
