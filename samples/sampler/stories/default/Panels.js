/* eslint-disable react/jsx-no-bind */

import PropTypes from 'prop-types';
import {useState} from 'react';
import {storiesOf} from '@storybook/react';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select} from '@enact/storybook-utils/addons/knobs';
import {mergeComponentMetadata} from '@enact/storybook-utils';

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

const BasicPanels = () => {
	const [index, setIndex] = useState(0);
	const goNext = () => setIndex(clamp(0, 2, index + 1));
	const goPrevious = () => setIndex(clamp(0, 2, index - 1));

	return (
		<Panels
			index={index}
			noAnimation={boolean('noAnimation', Config, false)}
			noCloseButton={boolean('noCloseButton', Config, false)}
			onApplicationClose={action('onClose')}
			onBack={goPrevious}
			orientation={select('orientation', ['horizontal', 'vertical'], Config)}
		>
			<FirstPanel onClick={goNext} />
			<SecondPanel onClick={goPrevious} />
		</Panels>
	);
};

storiesOf('Agate', module)
	.add(
		'Panels',
		() => (
			<BasicPanels
				noAnimation={boolean('noAnimation', Config, false)}
				noCloseButton={boolean('noCloseButton', Config, false)}
				onApplicationClose={action('onClose')}
			/>
		),
		{
			props: {
				noScroller: true,
				noPanels: true
			},
			text: 'The basic Panels'
		}
	);
