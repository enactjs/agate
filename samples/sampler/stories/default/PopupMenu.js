import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, text} from '@enact/storybook-utils/addons/knobs';
import React, {useState} from 'react';
import {storiesOf} from '@storybook/react';

import Button from '@enact/agate/Button';
import CheckboxItem from '@enact/agate/CheckboxItem';
import Input from '@enact/agate/Input';
import Picker from '@enact/agate/Picker';
import PopupMenu from '@enact/agate/PopupMenu';

import css from './PopupMenu.module.less';

const Config = mergeComponentMetadata('PopupMenu', PopupMenu);

const Story = ({children: {props, type: Component}, ...rest}) => {
	const [menuOpen, setMenuOpen] = useState(false);

	function onClose () {
		setMenuOpen(false);
	}

	function onOpen () {
		setMenuOpen(true);
	}

	return (
		<div {...rest}>
			{menuOpen ? null : (<Button onClick={onOpen}>Open Menu</Button>)}
			<Component
				{...props}
				onClose={onClose}
				open={menuOpen}
			/>
		</div>
	);
};

storiesOf('Agate', module).add(
	'PopupMenu',
	() => {
		const closeButton = boolean('closeButton', Config);
		const noAnimation = boolean('noAnimation', Config);
		const noAutoDismiss = boolean('noAutoDismiss', Config);
		const title = text('title', Config, 'Configurator');

		return (
			<Story>
				<PopupMenu
					closeButton={closeButton}
					noAnimation={noAnimation}
					noAutoDismiss={noAutoDismiss}
					onHide={action('onHide')}
					title={title}
				>
					{!(noAutoDismiss && !closeButton) ? null : (
						<h2 className={css.cannotClose}>
							Warning! With <code>closeButton=false</code> and <code>noAutoDismiss=true</code> it will be impossible to close this menu.
						</h2>)}
					<Picker>
						{['Crunchy', 'Smooth']}
					</Picker>
					<Input placeholder="How many?" type="number" />
					<CheckboxItem>
						Rush delivery
					</CheckboxItem>
				</PopupMenu>
			</Story>
		);
	},
	{
		text: 'Basic usage of PopupMenu'
	}
);
