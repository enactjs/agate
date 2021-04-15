import Item from '../../../../Item';
import Icon from '../../../../Icon';

const slotBeforeIcon = <Icon>circlelarge</Icon>;
const slotAfterIcon = <Icon>circlelarge</Icon>;

const ItemTests = [
	<Item>Hello Item</Item>,
	<Item>مساء الخير</Item>,
	<Item disabled>Hello Item</Item>,
	<Item label="label text" labelPosition="above">Hello Item</Item>,
	<Item label="label text" labelPosition="below">Hello Item</Item>,
	<Item label="label text" labelPosition="after">Hello Item</Item>,
	<Item label="label text" labelPosition="before">Hello Item</Item>,
	<Item centered>Hello Item</Item>,
	<Item centered label="label text">Hello Item</Item>,
	<Item selected>Hello Item</Item>,
	<Item size="small">Hello Item</Item>,
	<Item inline>Hello Item</Item>,
	<Item inline label="label text" labelPosition="after">Hello Item</Item>,
	<Item inline label="label text" labelPosition="before">Hello Item</Item>,

	// Selected - disabled
	<Item selected disabled>Hello Item</Item>,

	// Selected - disabled - inline
	<Item selected disabled inline>Hello Item</Item>,

	// Selected - inline
	<Item selected inline>Hello Item</Item>,
	<Item selected inline label="label text" labelPosition="after">Hello Item</Item>,
	<Item selected inline label="label text" labelPosition="before">Hello Item</Item>,

	// Icon slotBefore
	<Item slotBefore={slotBeforeIcon}>Hello Item</Item>,
	<Item inline slotBefore={slotBeforeIcon}>Hello Item</Item>,
	<Item selected slotBefore={slotBeforeIcon}>Hello Item</Item>,
	<Item inline selected slotBefore={slotBeforeIcon}>Hello Item</Item>,

	// Icon slotAfter
	<Item slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item inline slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item selected slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item inline selected slotAfter={slotAfterIcon}>Hello Item</Item>,

	// Centered slotBefore and slotAfter
	<Item centered slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item centered label="label below" labelPosition="below" slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item centered label="label above" labelPosition="above" slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item centered label="label before" labelPosition="before" slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,
	<Item centered label="label after" labelPosition="after" slotBefore={slotBeforeIcon} slotAfter={slotAfterIcon}>Hello Item</Item>,

	// *************************************************************
	// locale = 'ar-SA'
	{
		locale: 'ar-SA',
		component: <Item>Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item disabled>Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item inline>Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item selected>Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item selected inline>Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item selected inline disabled>Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item label="label text">Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item label="label text" selected>Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: <Item label="label text" inline>Hello Item</Item>
	},
	{
		locale: 'ar-SA',
		component: [
			<Item slotBefore={slotBeforeIcon}>Hello Item</Item>,
			<Item slotBefore={slotBeforeIcon} inline>Hello Item</Item>,
			<Item slotBefore={slotBeforeIcon} inline disabled>Hello Item</Item>,
			<Item slotBefore={slotBeforeIcon} inline selected>Hello Item</Item>,
			<Item slotBefore={slotBeforeIcon} inline disabled selected>Hello Item</Item>
		]
	},
	{
		locale: 'ar-SA',
		component: [
			<Item slotAfter={slotAfterIcon}>Hello Item</Item>,
			<Item slotAfter={slotAfterIcon} inline>Hello Item</Item>,
			<Item slotAfter={slotAfterIcon} inline disabled>Hello Item</Item>,
			<Item slotAfter={slotAfterIcon} inline selected>Hello Item</Item>,
			<Item slotAfter={slotAfterIcon} inline disabled selected>Hello Item</Item>
		]
	}
];

export default ItemTests;
