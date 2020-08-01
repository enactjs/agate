import ToggleButton from '../../../../ToggleButton';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';

const app = (props) => <div {...props}>
	<div>
		<div>
			<ToggleButton
				id="toggleButton1"
			>
				Missing Toggle Label
			</ToggleButton>
		</div>
		<div>
			<ToggleButton
				id="toggleButton2"
				size="small"
			>
				Small Button
			</ToggleButton>
		</div>
		<div>
			<ToggleButton
				id="toggleButton3"
				toggleOnLabel="On"
				toggleOffLabel="Off"
			/>
		</div>
	</div>
</div>;

export default ThemeDecorator(app);
