import TimePicker from '@enact/agate/TimePicker';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const TimePickerView = () => (
	<>
		<Section title="Default">
			<TimePicker alt="Normal" />
			<TimePicker alt="Disabled" disabled />
		</Section>
		<Section className={appCss.marginTop} title="Aria-labelled">
			<TimePicker alt="Aria-labelled" hourAriaLabel="hour" meridiemAriaLabel="meridiem" minuteAriaLabel="minute" />
			<TimePicker alt="Aria-labelled and Disabled" disabled hourAriaLabel="hour" meridiemAriaLabel="meridiem" minuteAriaLabel="minute" />
		</Section>
	</>
);

export default TimePickerView;
