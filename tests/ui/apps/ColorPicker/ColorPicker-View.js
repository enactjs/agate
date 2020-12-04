import ColorPicker from '../../../../ColorPicker';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div id="wrapper" style={{display: 'flex', flexDirection: 'column'}}>
		<ColorPicker
			id="colorPickerDefault"
			defaultValue="#FF7FAE"
			style={{padding: '40px'}}
		>
			{['#8333E9', '#FF7FAE', '#FFC6BF', '#F9F7F1']}
		</ColorPicker>
		<ColorPicker
			id="colorPickerDisabled"
			disabled={false}
			defaultValue="#44C5CB"
			style={{padding: '40px'}}
		>
			{['#44C5CB', '#FCE315', '#F53D52', '#FF9200']}
		</ColorPicker>
		<ColorPicker
			id="colorPickerDirectionUp"
			direction="up"
			defaultValue="#FAC22B"
			style={{padding: '40px'}}
		>
			{['#D7255D', '#603E95', '#009DA1', '#FAC22B']}
		</ColorPicker>
		<ColorPicker
			id="colorPickerOpen"
			direction="left"
			defaultValue="#F6F6F6"
			open
			style={{padding: '40px'}}
		>
			{['#2B6490', '#F2C300', '#9CCEE1', '#F6F6F6']}
		</ColorPicker>
	</div>
</div>;

export default ThemeDecorator(app);
