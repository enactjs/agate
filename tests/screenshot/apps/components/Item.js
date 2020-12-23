import Item from '../../../../Item';
import React from 'react';

const ItemTests = [
	<Item>Hello Item</Item>,
	<Item disabled>Hello Item</Item>,
	<Item slotBeforeIcon="circlelarge" slotAfterIcon="circlelarge">Hello Item</Item>,
	<Item label="label text" labelPosition="below">Hello Item</Item>,
	<Item centered>Hello Item</Item>,
	<Item centered label="label text">Hello Item</Item>,
	<Item selected>Hello Item</Item>,
	<Item size="small">Hello Item</Item>
];

export default ItemTests;
