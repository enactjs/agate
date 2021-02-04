import LabeledIconButton from '../../../../LabeledIconButton';
import React from 'react';

const LabeledIconButtonTests = [
	<LabeledIconButton />,
	<LabeledIconButton backgroundOpacity="lightOpaque">Hello!</LabeledIconButton>,
	<LabeledIconButton highlighted />,
	<LabeledIconButton icon="home" labelPosition="after">Hello Home!</LabeledIconButton>,
	<LabeledIconButton inline labelPosition="above" size="smallest">Hello LabeledIconButton</LabeledIconButton>,
	<LabeledIconButton selected size="small" />,
	<LabeledIconButton size="huge" tooltipText="Hello tooltip">Hello huge button!</LabeledIconButton>,
	<LabeledIconButton disabled labelPosition="right">I am disabled</LabeledIconButton>
];

export default LabeledIconButtonTests;
