/* eslint-disable react/jsx-no-bind */

import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/controls';
import PropTypes from 'prop-types';
import {useState} from 'react';
import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panels, Panel} from '@enact/agate/Panels';
import kind from '@enact/core/kind';
import {clamp} from '@enact/core/util';

Panels.displayName = 'Panels';
const Config = mergeComponentMetadata('Panels', Panels);

const FirstPanel = kind({
	name: 'FirstPanel',

	propTypes: {
		onClick: PropTypes.func
	},

	render: ({onClick, ...rest}) => (
		<Panel {...rest}>
			<Header title="First Panel" />
			<Button onClick={onClick}>Click me</Button>
		</Panel>
	)
});

const SecondPanel = kind({
	name: 'SecondPanel',

	render: (props) => (
		<Panel {...props}>
			<Header title="Second Panel" />
			<Button>Click me</Button>
		</Panel>
	)
});

const BasicPanels = ({orientation, ...rest}) => {
	const [index, setIndex] = useState(0);
	const goNext = () => setIndex(clamp(0, 2, index + 1));
	const goPrevious = () => setIndex(clamp(0, 2, index - 1));

	return (
		<Panels
			{...rest}
			index={index}
			onBack={goPrevious}
			orientation={orientation}
		>
			<FirstPanel onClick={goNext} />
			<SecondPanel onClick={goPrevious} />
		</Panels>
	);
};

BasicPanels.propTypes = {
	orientation: PropTypes.string
};

export default {
	title: 'Agate/Panels',
	component: 'Panels'
};

export const _Panels = (args) => (
	<BasicPanels
		noAnimation={args['noAnimation']}
		noCloseButton={args['noCloseButton']}
		onApplicationClose={action('onClose')}
		orientation={args['orientation']}
	/>
);

boolean('noAnimation', _Panels, Config, false);
boolean('noCloseButton', _Panels, Config, false);
select('orientation', _Panels, ['horizontal', 'vertical'], Config);

_Panels.storyName = 'Panels';
_Panels.parameters = {
	props: {
		noScroller: true,
		noPanels: true
	},
	info: {
		text: 'The basic Panels'
	}
};
