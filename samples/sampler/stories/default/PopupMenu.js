import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import React, {useState} from 'react';

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

export default {
	title: 'Agate/PopupMenu',
	component: 'PopupMenu'
}

export const _PopupMenu = () => {
	const closeButton = boolean('closeButton', Config);
	const noAutoDismiss = boolean('noAutoDismiss', Config);

	return (
		<Story>
			<PopupMenu
				closeButton={closeButton}
				closeButtonLabel={text('closeButtonLabel', Config)}
				noAnimation={boolean('noAnimation', Config)}
				noAutoDismiss={noAutoDismiss}
				onClose={action('onClose')}
				onHide={action('onHide')}
				scrimType={select('scrimType', ['none', 'translucent', 'transparent'], Config, 'translucent')}
				spotlightRestrict={select('spotlightRestrict', ['self-first', 'self-only'], Config, 'self-only')}
				title={text('title', Config, 'Title')}
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
};

_PopupMenu.storyName = 'PopupMenu';
_PopupMenu.parameters = {
	info: {
		text: 'Basic usage of PopupMenu'
	}
};
