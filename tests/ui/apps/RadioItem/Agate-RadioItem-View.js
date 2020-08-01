import RadioItem from '../../../../RadioItem';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<RadioItem
			id="radioItem1"
		>
			Radio Item1
		</RadioItem>
		<RadioItem
			id="radioItem2"
			defaultSelected
		>
			Radio Item selected
		</RadioItem>
	</div>
</div>;

export default ThemeDecorator(app);
