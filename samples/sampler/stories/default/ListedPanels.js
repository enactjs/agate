import {action} from '@enact/storybook-utils/addons/actions';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import PropTypes from 'prop-types';
import {storiesOf} from '@storybook/react';
import compose from 'ramda/src/compose';

import Button from '@enact/agate/Button';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import LabeledIconButton from '@enact/agate/LabeledIconButton';
import {Panel, ListedPanels} from '@enact/agate/Panels';
import {ListedPanelsBase} from '@enact/agate/Panels/ListedPanels';
import $L from '@enact/i18n/$L';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';

const Config = mergeComponentMetadata('ListedPanels', ListedPanelsBase);
// `paddingBottom: '56.25%'` is a trick to impose 16:9 aspect ratio on the component, since padding percentage is based on the width, not the height.

const I18nListedPanelsBase = ({rtl}) => {
	const [panelIndex, setIndex] = React.useState(Config.defaultProps.index || 0);
	const [listIndex, setListIndex] = React.useState(Config.defaultProps.listIndex || 0);
	const onSelect = (e) => {
		setIndex(e.index);
		action('onSelect')(e);
	};

	const onClick = (e) => {
		setListIndex(1);
		setIndex(1);
	};

	const backward = () => {
		setListIndex(listIndex - 1);
		setIndex(0);
	};
	const handleBack = compose(backward, action('onBack'));

	return (
		<div style={{paddingBottom: '56.25%'}}>
			<ListedPanels
				duration={number('duration', Config, 400)}
				index={panelIndex}
				listIndex={listIndex}
				onBack={handleBack}
				onClick={action('onClick')}
				onSelect={onSelect} // eslint-disable-line react/jsx-no-bind
				items={[
					[
						{title: 'Profiles'},
						{title: 'Devices'},
						{title: 'Sound'},
						{title: 'Display'},
						{title: 'System'}
					],
					[
						{title: 'Profile1'},
						{title: 'Profile2'},
						{title: 'Profile3'}
					]
				]}
			>
				<Panel>
					<Button icon="netbook" onClick={onClick}>Click me!</Button>
				</Panel>
				<Panel>
					<Item label="label" labelPosition="before" slotBefore={<Icon>aircirculation</Icon>}>Hello Item</Item>
				</Panel>
				<Panel className="enact-fit">
					<LabeledIconButton
						labelPosition="after"
						icon="temperature"
					>
						Hello LabeledIconButton
					</LabeledIconButton>
				</Panel>
				<Panel>
					<div>
						A simple view with no associated tab
					</div>
				</Panel>
				<Panel>
					<div>
						A simple view with no associated tab
					</div>
				</Panel>
			</ListedPanels>
		</div>
	);
};

I18nListedPanelsBase.propTypes = {
	rtl: PropTypes.bool
};

const I18nListedPanels = I18nContextDecorator({rtlProp: 'rtl'}, I18nListedPanelsBase);

storiesOf('Agate', module)
	.add(
		'ListedPanels',
		() => (<I18nListedPanels />),
		{
			text: 'The basic ListedPanels'
		}
	);
