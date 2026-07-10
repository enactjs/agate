import Item from '../../../../Item';
import Icon from '../../../../Icon';

import {withConfig} from './utils';

const slotBeforeIcon = <Icon>circlelarge</Icon>;
const slotAfterIcon = <Icon>circlelarge</Icon>;

const ItemSmokeTests = [
	<Item>Hello Item</Item>,
	<Item>مساء الخير</Item>,
	<Item disabled>Hello Item</Item>,
	<Item inline>Hello Item</Item>,
	<Item selected>Hello Item</Item>,
	<Item selected inline>Hello Item</Item>,
	<Item selected disabled inline>Hello Item</Item>,
	<Item label="label text" labelPosition="above">Hello Item</Item>,
	<Item inline label="label text" labelPosition="after">Hello Item</Item>,
	<Item label="label text" selected>Hello Item</Item>,

	// Icon slotBefore
	<Item slotBefore={slotBeforeIcon}>Hello Item</Item>,
	<Item inline slotBefore={slotBeforeIcon}>Hello Item</Item>,
	<Item selected slotBefore={slotBeforeIcon}>Hello Item</Item>,
	<Item inline selected slotBefore={slotBeforeIcon}>Hello Item</Item>,

	// Icon slotAfter
	<Item slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item inline slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item selected slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item inline selected slotAfter={slotAfterIcon}>Hello Item</Item>
];

const ItemAdditionalTests = [
	<Item label="label text" labelPosition="below">Hello Item</Item>,
	<Item label="label text" labelPosition="after">Hello Item</Item>,
	<Item label="label text" labelPosition="before">Hello Item</Item>,
	<Item centered>Hello Item</Item>,
	<Item centered label="label text">Hello Item</Item>,
	<Item size="small">Hello Item</Item>,
	<Item inline label="label text" labelPosition="before">Hello Item</Item>,

	// Selected - disabled
	<Item selected disabled>Hello Item</Item>,

	// Selected - inline
	<Item selected inline label="label text" labelPosition="after">Hello Item</Item>,
	<Item selected inline label="label text" labelPosition="before">Hello Item</Item>,

	// Centered slotBefore and slotAfter
	<Item centered slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item centered label="label below" labelPosition="below" slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item centered label="label above" labelPosition="above" slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item centered label="label before" labelPosition="before" slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item centered label="label after" labelPosition="after" slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
];

const ItemTests = [
	...ItemSmokeTests,
	...ItemAdditionalTests,
	...withConfig({locale: 'ar-SA'}, ItemSmokeTests) // locale = 'ar-SA'
];

export default ItemTests;
