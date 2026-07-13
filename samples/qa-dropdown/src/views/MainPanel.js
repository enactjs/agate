import Button from '@enact/agate/Button';
import Dropdown from '@enact/agate/Dropdown';
import Header from '@enact/agate/Header';
import {Panel, Panels} from '@enact/agate/Panels';
import {useCallback, useState} from 'react';
import ri from "@enact/ui/resolution";

const Wrapper = ({children}) => (
	<div style={{height: '100%'}}>
		<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
			{children}
		</div>
	</div>
);


const MainPanel = () => {
	const [open, setOpen] = useState(false);

	const handleOpen = useCallback(() => setOpen(true), []);
	const handleClose = useCallback(() => setOpen(false), []);

	return (
		<Panels open noCloseButton>
			<Panel open title="QA Sample - Dropdown">
				<Wrapper><Button>here</Button></Wrapper>
			</Panel>
		</Panels>
	);
};

export default MainPanel;
