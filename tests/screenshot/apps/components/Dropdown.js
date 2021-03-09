import Dropdown from '../../../../Dropdown';

const DropdownTests = [
	<Dropdown title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown defaultSelected={1}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown disabled title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,

	// Different Widths
	<Dropdown title="Select your option" width="smallest">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown title="Select your option" width="small">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown title="Select your option" width="large">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown title="Select your option" width="x-large">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown title="Select your option" width="huge">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,

	// Dropdown Open
	<div>
		<Dropdown open title="Select your option" style={{marginLeft: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,
	<div style={{'height': '700px'}}>
		<Dropdown direction="above" open style={{marginLeft: '12px', marginTop: '300px'}} title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,
	<div>
		<Dropdown defaultSelected={1} open style={{marginLeft: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,
	<div>
		<Dropdown disabled open title="Select your option" style={{marginLeft: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,
	// long options text
	<div>
		<Dropdown open title="Select your option" width="smallest" style={{marginLeft: '12px'}}>{['Option 1234567890123457', 'Option 2345678902345678', 'Option 345678903456789034567890']}</Dropdown>,
	</div>,

	// Open with different widths
	<div>
		<Dropdown open title="Select your option" width="small" style={{marginLeft: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,
	<div>
		<Dropdown open title="Select your option" width="large" style={{marginLeft: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,
	<div>
		<Dropdown open title="Select your option" width="x-large" style={{marginLeft: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,
	<div>
		<Dropdown open title="Select your option" width="huge" style={{marginLeft: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,

	// RTL
	{
		locale: 'ar-SA',
		component:<Dropdown title="Select your option" style={{marginRight: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	},
	{
		locale: 'ar-SA',
		component:<Dropdown defaultSelected={1} style={{marginRight: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	},
	{
		locale: 'ar-SA',
		component:<Dropdown disabled title="Select your option" style={{marginRight: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	},

	// Dropdown Open
	{
		locale: 'ar-SA',
		component:
	<div>
		<Dropdown open title="Select your option" style={{marginRight: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>
	},
	{
		locale: 'ar-SA',
		component:
	<div>
		<Dropdown direction="above" open style={{marginRight: '12px', marginTop: '300px'}} title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>
	},
	{
		locale: 'ar-SA',
		component:
	<div>
		<Dropdown defaultSelected={1} open style={{marginRight: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>
	},
	{
		locale: 'ar-SA',
		component:
	<div>
		<Dropdown disabled open title="Select your option" style={{marginRight: '12px'}}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>
	}
];

export default DropdownTests;
