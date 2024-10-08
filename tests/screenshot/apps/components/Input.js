import Input from '../../../../Input';
import {withConfig} from './utils';

const LoremString = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ac tellus in velit ornare commodo. Nam dignissim fringilla nulla, sit amet hendrerit sapien laoreet quis. Praesent quis tellus non diam viverra feugiat.';

const InputTests = [
	<Input />,
	<Input placeholder="Placeholder Input" />,
	<Input placeholder="Placeholder Input" disabled />,

	// InputField field of type 'number' should be empty with letters as input
	<Input value="Simple value" type="number" />,
	// InputField field of type 'number' should be empty with letters as input
	<Input value="Simple value" type="number" disabled />,

	<Input value="1234567890" type="number" />,
	<Input value="1234567890" type="number" disabled />,
	<Input value="Simple value" type="password" />,
	<Input value="Simple value" type="password" disabled />,

	// Long Text: Ellipses display with Letters, Numbers, Special Characters
	<Input value={LoremString} />,
	<Input value="!@#$%^&()_+-=[]\;',./{}|:?" />,
	<Input value="012345678901234567890123456789" />,

	// Invalid
	<div>
		<Input invalid style={{margin:'100px'}} />
	</div>,
	<div>
		<Input invalid invalidMessage="Custom invalid message" style={{margin:'100px'}} />
	</div>,

	// Large input
	<Input value="Simple value" />,
	<Input value="Simple value" iconBefore="happyface" />,
	<Input value="Simple value" iconAfter="happyface" />,

	// Small input
	<Input value="Simple value" size="small" />,
	<Input value="Simple value" iconBefore="happyface" size="small" />,
	<Input value="Simple value" iconAfter="happyface" size="small" />,

	// Input with clear input button
	<Input value="Simple value" clearButton />,
	<Input value="Simple value" clearButton disabled />,
	<Input value="Simple value" clearButton size="small" />,
	<Input value="Simple value" clearButton size="small" disabled />,
	<Input value="Simple value" clearButton iconBefore="happyface" />,
	<Input value="Simple value" clearButton iconBefore="happyface" disabled />,
	<Input value="Simple value" clearButton iconAfter="happyface" />,
	<Input value="Simple value" clearButton iconAfter="happyface" disabled />,
	<Input value="Simple value" clearButton iconBefore="happyface" size="small" />,
	<Input value="Simple value" clearButton iconBefore="happyface" size="small" disabled />,
	<Input value="Simple value" clearButton iconAfter="happyface" size="small" />,
	<Input value="Simple value" clearButton iconAfter="happyface" size="small" disabled />,
	<Input value="Simple value" clearButton iconBefore="happyface" iconAfter="happyface" />,
	<Input value="Simple value" clearButton iconBefore="happyface" iconAfter="happyface" disabled />,
	<Input value="Simple value" clearButton iconBefore="happyface" iconAfter="happyface" size="small" />,
	<Input value="Simple value" clearButton iconBefore="happyface" iconAfter="happyface" size="small" disabled />,
	<Input value="Simple value" iconAfter="happyface" size="small" />,

	// Focus
	...withConfig({focus: true}, [
		<Input placeholder="Focused placeholder Input" />,
		<Input placeholder="Focused placeholder Input" disabled />,
		<Input value="Focused simple value" />,
		<Input value="Focused simple value" disabled />,
		<div>
			<Input invalid invalidMessage="Focused custom invalid message" style={{margin:'100px'}} />
		</div>,
		<Input value="Focused simple value" iconAfter="happyface" iconBefore="happyface" />,
		<Input value="Focused simple value" iconAfter="happyface" iconBefore="happyface" size="small" />
	]),

	// RTL
	...withConfig({locale: 'ar-SA'}, [
		<Input placeholder="ar-SA placeholder" />,
		<Input placeholder="ar-SA placeholder" disabled />,
		<Input value="ar-SA simple value" />,
		<Input value="ar-SA simple value" disabled />,
		<Input value="ar-SA simple value" clearButton />,
		<div>
			<Input invalid invalidMessage="ar-SA custom invalid message" style={{margin:'100px'}} />
		</div>,
		<Input value="ar-SA simple value" iconAfter="happyface" iconBefore="happyface" />,
		<Input value="ar-SA simple value" iconAfter="happyface" iconBefore="happyface" size="small" />
	])
];

export default InputTests;
