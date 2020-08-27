import Button from '@enact/agate/Button';
import Drawer from '@enact/agate/Drawer';
import React from 'react';

import Section from '../components/Section';
import useBoolArray from '../components/useBoolArray';

import appCss from '../App/App.module.less';

const DrawerView = () => {
	const [open, handleOpen] = useBoolArray(4);

	return (
		<>
			<Section title="Default">
				<Button alt="Normal" onClick={handleOpen(0, true)}>Open 0</Button>
				<Button alt="Disabled Drawer" onClick={handleOpen(1, true)}>Open 1</Button>

				<Drawer open={open[0]}>
					Text 0
					<Button onClick={handleOpen(0, false)}>Close</Button>
				</Drawer>
				<Drawer alt="Disabled" disabled open={open[1]}>
					Text 1
					<Button onClick={handleOpen(1, false)}>Close</Button>
				</Drawer>
			</Section>

			<Section className={appCss.marginTop} title="Aria-labelled">
				<Button alt="Aria-labelled" onClick={handleOpen(2, true)}>Open 0</Button>
				<Button alt="Aria-labelled and Disabled" onClick={handleOpen(3, true)}>Open 1</Button>

				<Drawer aria-label="This is a Label 2." open={open[2]}>
					Text 2
					<Button onClick={handleOpen(2, false)}>Close</Button>
				</Drawer>
				<Drawer aria-label="This is a Label 3." disabled open={open[3]}>
					Text 3
					<Button onClick={handleOpen(3, false)}>Close</Button>
				</Drawer>
			</Section>
		</>
	);
};

export default DrawerView;
