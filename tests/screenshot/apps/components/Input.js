import Input from '../../../../Input';
import React from 'react';

const InputTests = [
	<Input dismissOnEnter />,
	<Input iconAfter="cancel" />,
	<Input placeholder="This is a placeholder" />,
	<Input size="small" />,
	<Input invalid />,
	<Input invalid invalidMessage="Custom invalid message" />,
	<Input iconAfter="cancel" iconSize="small" />
];

export default InputTests;
