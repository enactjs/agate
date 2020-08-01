import Input from '../../../../Input';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<div>
			<Input
				id="input5"
				disabled
				defaultValue="Input field five"
			/>
		</div>
	</div>
</div>;

export default ThemeDecorator(app);

