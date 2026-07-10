import Dropdown from '../../../../Dropdown';

import {withConfig} from './utils';

const DropdownSmokeTests = [
	<Dropdown title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown defaultSelected={1}>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown disabled title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,

	// Dropdown Open
	<Dropdown open title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<div style={{'height': '700px'}}>
		<Dropdown direction="above" open style={{'margin-top': '300px'}} title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
	</div>,
	<Dropdown direction="above" open title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown defaultSelected={1} open>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown disabled open title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
];

const DropdownWithDifferentWidthsTests = [
	// Different Widths
	<Dropdown title="Select your option" width="smallest">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown title="Select your option" width="small">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown title="Select your option" width="large">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown title="Select your option" width="x-large">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown title="Select your option" width="huge">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,


	// long options text
	<Dropdown open title="Select your option" width="smallest">{['Option 1234567890123457', 'Option 2345678902345678', 'Option 345678903456789034567890']}</Dropdown>,

	// Open with different widths
	<Dropdown open title="Select your option" width="small">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown open title="Select your option" width="large">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown open title="Select your option" width="x-large">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown open title="Select your option" width="huge">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
];

const DropdownTests = [
	...DropdownSmokeTests,
	...DropdownWithDifferentWidthsTests,
	...withConfig({locale: 'ar-SA'}, DropdownSmokeTests) // RTL
];

export default DropdownTests;
