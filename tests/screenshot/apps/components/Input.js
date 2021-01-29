import Input from '../../../../Input';
import React from 'react';
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

	<Input invalid />,
	<Input invalid invalidMessage="Custom invalid message" />,

	// Large input
	<Input value="Simple value" />,
	<Input value="Simple value" iconBefore="happyface" />,
	<Input value="Simple value" iconAfter="happyface" />,

	// Small input
	<Input value="Simple value" size="small" />,
	<Input value="Simple value" iconBefore="happyface" size="small" />,
	<Input value="Simple value" iconAfter="happyface" size="small" />,
];

export default InputTests;
