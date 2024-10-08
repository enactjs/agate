import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {useCallback, useState} from 'react';
import Button from '@enact/agate/Button';
import LabeledIconButton from '@enact/agate/LabeledIconButton';
import PopupMenu from '@enact/agate/PopupMenu';

import css from './PopupMenu.module.less';

PopupMenu.displayname = 'PopupMenu';
const Config = mergeComponentMetadata('PopupMenu', PopupMenu);

const Story = ({children: {props, type: Component}, ...rest}) => {
	const [menuOpen, setMenuOpen] = useState(false);

	const onClose = useCallback(() => {
		setMenuOpen(false);
	}, []);

	const onOpen = useCallback(() => {
		setMenuOpen(true);
	}, []);

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
};

export const _PopupMenu = (args) => {
	const closeButton = args['closeButton'];
	const noAutoDismiss = args['noAutoDismiss'];

	return (
		<Story>
			<PopupMenu
				closeButton={closeButton}
				closeButtonLabel={args['closeButtonLabel']}
				noAnimation={args['noAnimation']}
				noAutoDismiss={noAutoDismiss}
				onClose={action('onClose')}
				onHide={action('onHide')}
				scrimType={args['scrimType']}
				spotlightRestrict={args['spotlightRestrict']}
				title={args['title']}
			>
				{!(noAutoDismiss && !closeButton) ? null : (
					<h2 className={css.cannotClose}>
						Warning! With <code>closeButton=false</code> and <code>noAutoDismiss=true</code> it will be impossible to close this menu.
					</h2>)}
				<LabeledIconButton
					css={css}
					inline
					icon="home"
					size="huge"
					backgroundOpacity="lightOpaque"
				>
					Home
				</LabeledIconButton>
				<LabeledIconButton
					css={css}
					inline
					icon="user"
					size="huge"
					backgroundOpacity="lightOpaque"
				>
					User
				</LabeledIconButton>
			</PopupMenu>
		</Story>
	);
};

boolean('closeButton', _PopupMenu, Config);
boolean('noAutoDismiss', _PopupMenu, Config);
text('closeButtonLabel', _PopupMenu, Config);
boolean('noAnimation', _PopupMenu, Config);
select('scrimType', _PopupMenu, ['none', 'translucent', 'transparent'], Config, 'translucent');
select('spotlightRestrict', _PopupMenu, ['self-first', 'self-only'], Config, 'self-only');
text('title', _PopupMenu, Config, 'Title');

_PopupMenu.storyName = 'PopupMenu';
_PopupMenu.parameters = {
	info: {
		text: 'Basic usage of PopupMenu'
	}
};
