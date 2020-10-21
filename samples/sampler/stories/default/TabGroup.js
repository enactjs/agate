import kind from '@enact/core/kind';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select} from '@enact/storybook-utils/addons/knobs';
import PropTypes from 'prop-types';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/agate/Button';
import TabGroup from '@enact/agate/TabGroup';

const Config = mergeComponentMetadata('TabGroup', TabGroup);
TabGroup.displayName = 'TabGroup';

const OrientedTabGroup = kind({
	name: 'OrientatedTabGroup',

	propTypes: {
		orientation: PropTypes.string
	},

	computed: {
		beforeTabs: ({orientation}) => (
			<Button
				icon={orientation === "vertical" ? "arrowlargeup" : "arrowlargeleft"}
				size="small"
				type="grid"
			/>
		),
		afterTabs: ({orientation}) => (
			<Button
				icon={orientation === "vertical" ? "arrowlargedown" : "arrowlargeright"}
				size="small"
				type="grid"
			/>
		)
	},

	render: ({...rest}) => {
		return (
			<TabGroup {...rest} />
		)
	}
});

storiesOf('Agate', module)
	.add(
		'TabGroup',
		() => (
			<OrientedTabGroup
				orientation={select('orientation', ['vertical', 'horizontal'], Config, 'horizontal')}
				tabPosition={select('tabPosition', ['before', 'after'], Config, 'before')}
				tabs={[
					{title: 'Home', icon: 'home'},
					{title: 'Settings', icon: 'setting'},
					{title: 'Theme', icon: 'display'}
				]}
			>
			</OrientedTabGroup>
		),
		{
			text: 'The basic TabGroup'
		}
	);
