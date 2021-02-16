import Dropdown from '../../../../Dropdown';

const DropdownTests = [
	<Dropdown open>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown direction="right" open>{['Option 1', 'Option 2', 'Option 3']}</Dropdown>,
	<Dropdown open title="Select your option">{['Option 1', 'Option 2', 'Option 3']}</Dropdown>
];

export default DropdownTests;
