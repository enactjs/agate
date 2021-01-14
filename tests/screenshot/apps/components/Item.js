import Item from '../../../../Item';
import React from 'react';
import Icon from '../../../../Icon';

const slotBeforeIcon = <Icon>circlelarge</Icon>;
const slotAfterIcon = <Icon>circlelarge</Icon>;

const ItemTests = [
	<Item>Hello Item</Item>,
	<Item disabled>Hello Item</Item>,
	<Item slotBefore={slotBeforeIcon}>Hello Item</Item>,
	<Item slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item label="label text" labelPosition="above">Hello Item</Item>,
	<Item label="label text" labelPosition="below">Hello Item</Item>,
	<Item label="label text" labelPosition="after">Hello Item</Item>,
	<Item label="label text" labelPosition="before">Hello Item</Item>,
	<Item centered>Hello Item</Item>,
	<Item centered label="label text">Hello Item</Item>,
	<Item selected>Hello Item</Item>,
	<Item size="small">Hello Item</Item>,
	<Item inline>Hello Item</Item>
];

export default ItemTests;
