import Picker from '../../../../Picker';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<Picker
			id="picker1"
		>
			Radio Item1
		</Picker>
		<Picker
			id="picker2"
			defaultSelected
		>
			Radio Item selected
		</Picker>
	</div>
</div>;

export default ThemeDecorator(app);
