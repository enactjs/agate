import Button from '@enact/agate/Button';
import Dropdown from '@enact/agate/Dropdown';
import Header from '@enact/agate/Header';
import {Panel, Panels} from '@enact/agate/Panels';
import {useCallback, useState} from 'react';

const MainPanel = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = useCallback(() => setOpen(true), []);
	const handleClose = useCallback(() => setOpen(false), []);

	return (
		<Panels noCloseButton>
			<Panel title="QA Sample - Dropdown">
				<Header hideLine title="QA Sample - Dropdown" />
				<Dropdown onClose={handleClose} onOpen={handleOpen} open={open} size="large" title="language">
					{['English', 'Korean', 'Spanish', 'Amharic', 'Thai', 'Arabic', 'Urdu', 'Simplified Chinese', 'Traditional Chinese', 'Vietnamese']}
				</Dropdown>
				<Button size="large">
					Enter
				</Button>
			</Panel>
		</Panels>
	);
};

export default MainPanel;
