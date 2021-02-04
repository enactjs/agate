import LabeledIconButton from '../../../../LabeledIconButton';
import React from 'react';

const LabeledIconButtonTests = [
	<LabeledIconButton backgroundOpacity="lightOpaque">Hello!</LabeledIconButton>,
	<LabeledIconButton highlighted />,
	<LabeledIconButton icon="home">Hello Home!</LabeledIconButton>,
	<LabeledIconButton inline size="smallest">Hello LabeledIconButton</LabeledIconButton>,
	<LabeledIconButton selected size="small" />,
	<LabeledIconButton size="huge" tooltipText="Hello tooltip">Hello huge button!</LabeledIconButton>,
	<LabeledIconButton disabled>I am disabled</LabeledIconButton>
];

export default LabeledIconButtonTests;
