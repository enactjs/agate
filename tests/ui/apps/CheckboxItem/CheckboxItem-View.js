import CheckboxItem from '../../../../CheckboxItem';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<CheckboxItem
			id="checkboxItem1"
		>
			Checkbox Item
		</CheckboxItem>
		<CheckboxItem
			id="checkboxItem2"
			defaultSelected
		>
			Checkbox Item selected
		</CheckboxItem>
	</div>
</div>;

export default ThemeDecorator(app);
