import Item from '../../../../Item';
import React from 'react';

const ItemTests = [
	<Item>Hello Item</Item>,
	<Item disabled>Hello Item</Item>,
	<Item slotBeforeIcon="circlelarge" slotAfterIcon="circlelarge">Hello Item</Item>,
	<Item label="label text" labelPosition="below">Hello Item</Item>,
];
export default ItemTests;
