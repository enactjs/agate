import $L from '@enact/i18n/$L';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import PropTypes from 'prop-types';
import React from 'react';


import Button from '@enact/agate/Button';
import Icon from '@enact/agate/Icon';
import Item from '@enact/agate/Item';
import LabeledIconButton from '@enact/agate/LabeledIconButton';
import {Panel, TabbedPanels} from '@enact/agate/Panels';
import {TabbedPanelsBase} from '@enact/agate/Panels/TabbedPanels';

const Config = mergeComponentMetadata('TabbedPanels', TabbedPanelsBase);
// `paddingBottom: '56.25%'` is a trick to impose 16:9 aspect ratio on the component, since padding percentage is based on the width, not the height.

const I18nTabbedPanelsBase = ({rtl, ...rest}) => {
	const [panelIndex, setIndex] = React.useState(Config.defaultProps.index || 0);
	const onSelect = (e) => {
		setIndex(e.index);
		action('onSelect')(e);
	};
	const onBeforeTabs = () => {
		setIndex(Math.max(panelIndex - 1, 0));
	};
	const onAfterTabs = () => {
		setIndex(Math.min(panelIndex + 1, 2));
	};
	const orientation = select('orientation', ['vertical', 'horizontal'], Config, 'vertical');

	return (
		<div style={{paddingBottom: '56.25%'}}>
			<TabbedPanels
				{...rest}
				index={panelIndex}
				onSelect={onSelect} // eslint-disable-line react/jsx-no-bind
				orientation={orientation}
				tabPosition={select('tabPosition', ['before', 'after'], Config, 'before')}
				tabs={[
					{title: 'Button', icon: 'netbook'},
					{title: 'Item', icon: 'aircirculation'},
					{title: 'LabeledIconButton', icon: 'temperature'}
				]}
			>
				<beforeTabs>
					<Button
						aria-label={$L('Previous Tab')}
						icon={orientation === 'vertical' ? (rtl && 'arrowlargeright' || 'arrowlargeleft') : 'arrowlargeup'}
						onClick={onBeforeTabs} // eslint-disable-line react/jsx-no-bind
						size="small"
						type="grid"
					/>
				</beforeTabs>
				<afterTabs>
					<Button
						aria-label={$L('Next Tab')}
						icon={orientation === 'vertical' ? (rtl && 'arrowlargeleft' || 'arrowlargeright') : 'arrowlargedown'}
						onClick={onAfterTabs} // eslint-disable-line react/jsx-no-bind
						size="small"
						type="grid"
					/>
				</afterTabs>
				<Panel>
					<Button icon="netbook">Click me!</Button>
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
			</TabbedPanels>
		</div>
	);
};

I18nTabbedPanelsBase.propTypes = {
	rtl: PropTypes.bool
};

const I18nTabbedPanels = I18nContextDecorator({rtlProp: 'rtl'}, I18nTabbedPanelsBase);

export default {
	title: 'Agate/TabbedPanels',
	component: 'TabbedPanels'
};

export const _TabbedPanels = () => (
	<I18nTabbedPanels
		duration={number('duration', Config, 500)}
		onClick={action('onClick')}
		noCloseButton={boolean('noCloseButton', Config)}
	/>
);

_TabbedPanels.storyName = 'TabbedPanels';
_TabbedPanels.parameters = {
	info: {
		text: 'The basic TabbedPanels'
	}
};
