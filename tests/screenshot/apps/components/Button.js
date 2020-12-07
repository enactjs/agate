import Button from '../../../../Button';
import React from 'react';

const ButtonTests = [
	<Button>Click me</Button>,
	<Button icon="home" iconPosition="after" selected>Click me</Button>,
	<Button highlighted size="small">Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>,
	<Button badge={10} badgeColor="#FDC902">Not Selected. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Button>
];

export default ButtonTests;
