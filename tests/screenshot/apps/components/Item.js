import Item from '../../../../Item';
import React from 'react';

const ItemTests = [
	<Item />,
	<Item disabled />,
	<Item slotBeforeIcon="circlelarge" slotAfterIcon="circlelarge" />,
	<Item label="label text" labelPosition="below" />
];
export default ItemTests;
