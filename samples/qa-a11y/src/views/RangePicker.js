import RangePicker from '@enact/agate/RangePicker';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const SpotlightContainerSection = SpotlightContainerDecorator({enterTo: 'default-element', preserveId: true}, Section);

const RangePickerView = () => (
	<>
		<h2>Default</h2>

		<Section title="Horizontal">
			<RangePicker
				alt="Horizontal"
				defaultValue={0}
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="large"
			/>

			<RangePicker
				alt="Horizontal and Disabled"
				defaultValue={0}
				disabled
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="large"
			/>
		</Section>

		<SpotlightContainerSection className={appCss.marginTop} title="Vertical" vertical>
			<RangePicker
				alt="Vertical"
				defaultValue={0}
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Disabled"
				defaultValue={0}
				disabled
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>
		</SpotlightContainerSection>

		<h2 className={appCss.headerMarginTop}>decrementAriaLabel and incrementAriaLabel</h2>

		<Section className={appCss.marginTop} title="Horizontal">
			<RangePicker
				alt="Horizontal"
				decrementAriaLabel="This is a Label 1."
				defaultValue={0}
				incrementAriaLabel="This is a Label 2."
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="large"
			/>

			<RangePicker
				alt="Horizontal and Disabled"
				decrementAriaLabel="This is a Label 3."
				defaultValue={0}
				incrementAriaLabel="This is a Label 4."
				disabled
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="large"
			/>
		</Section>

		<SpotlightContainerSection className={appCss.marginTop} title="Vertical" vertical>
			<RangePicker
				alt="Vertical"
				decrementAriaLabel="This is a Label 9."
				defaultValue={0}
				incrementAriaLabel="This is a Label 10."
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Disabled"
				decrementAriaLabel="This is a Label 13."
				defaultValue={0}
				disabled
				incrementAriaLabel="This is a Label 14."
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>
		</SpotlightContainerSection>

		<h2 className={appCss.headerMarginTop}>Aria-labelled</h2>

		<Section className={appCss.marginTop} title="Horizontal">
			<RangePicker
				alt="Horizontal and Joined"
				aria-label="This is a Label 17."
				defaultValue={0}
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="large"
			/>

			<RangePicker
				alt="Horizontal, Joined, and Disabled"
				aria-label="This is a Label 18."
				defaultValue={0}
				disabled
				max={100}
				min={0}
				orientation="horizontal"
				step={5}
				width="large"
			/>
		</Section>

		<SpotlightContainerSection className={appCss.marginTop} title="Vertical" vertical>
			<RangePicker
				alt="Vertical"
				aria-label="This is a Label 21."
				decrementAriaLabel="This is a Label 22."
				defaultValue={0}
				incrementAriaLabel="This is a Label 23."
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>

			<RangePicker
				alt="Vertical and Disabled"
				aria-label="This is a Label 27."
				decrementAriaLabel="This is a Label 28."
				defaultValue={0}
				disabled
				incrementAriaLabel="This is a Label 29."
				max={100}
				min={0}
				orientation="vertical"
				step={5}
				width="medium"
			/>
		</SpotlightContainerSection>
	</>
);

export default RangePickerView;
