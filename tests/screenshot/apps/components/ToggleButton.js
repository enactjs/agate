import ToggleButton from '../../../../ToggleButton';

const ToggleButtonTests = [
	<ToggleButton>Click me!</ToggleButton>,
	<ToggleButton underline>Click me!</ToggleButton>,
	<ToggleButton disabled>Click me!</ToggleButton>,

	// size
	<ToggleButton size="smallest">Click me!</ToggleButton>,
	<ToggleButton size="small">Click me!</ToggleButton>,
	<ToggleButton size="huge">Click me!</ToggleButton>,

	// custom icon
	<ToggleButton icon="music">Click me!</ToggleButton>,

	// background opacity
	<ToggleButton backgroundOpacity="lightOpaque">Click me!</ToggleButton>,
	<ToggleButton backgroundOpacity="transparent">Click me!</ToggleButton>
];

export default ToggleButtonTests;
