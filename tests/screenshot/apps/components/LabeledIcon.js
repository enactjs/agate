import LabeledIcon from '../../../../LabeledIcon';

const LabeledIconTests = [
	<LabeledIcon />,
	<LabeledIcon flip="horizontal" icon="temperature">Hello LabeledIcon</LabeledIcon>,
	<LabeledIcon icon="time">Hello LabeledIcon</LabeledIcon>,
	<LabeledIcon icon="menu" labelPosition="left">Hello LabeledIcon</LabeledIcon>,
	<LabeledIcon icon="temperature" labelPosition="above" size="smallest">Hello LabeledIcon</LabeledIcon>,
	<LabeledIcon icon="search" labelPosition="before" size="small">Hello LabeledIcon</LabeledIcon>,
	<LabeledIcon icon="sun" inline labelPosition="after">Hello LabeledIcon</LabeledIcon>,
	<LabeledIcon disabled icon="temperature">Hello LabeledIcon</LabeledIcon>,
	<LabeledIcon flip="both" icon="stop" labelPosition="right" size="huge">Hello LabeledIcon</LabeledIcon>
];

export default LabeledIconTests;
