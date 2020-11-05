import DatePicker from '@enact/agate/DatePicker';
import React from 'react';

import Section from '../components/Section';

import appCss from '../App/App.module.less';

const DatePickerView = () => (
	<>
		<Section title="Default">
			<DatePicker alt="Normal" />
			<DatePicker alt="Disabled" disabled />
		</Section>
		<Section className={appCss.marginTop} title="Aria-labelled">
			<DatePicker alt="Aria-labelled" dayAriaLabel="day" monthAriaLabel="month" yearAriaLabel="year" />
			<DatePicker alt="Aria-labelled and Disabled" aria-label="This is a Label 1." disabled />
		</Section>
	</>
);

export default DatePickerView;
