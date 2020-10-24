import DatePicker from '@enact/agate/DatePicker';
import React from 'react';

import Section from '../components/Section';

const DatePickerView = () => (
	<>
		<Section title="Default">
			<DatePicker alt="Normal" />
			<DatePicker alt="Disabled" disabled />
		</Section>
	</>
);

export default DatePickerView;
