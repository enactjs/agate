import Button from '@enact/agate/Button';
import Header from '@enact/agate/Header';
import {Panel} from '@enact/agate/Panels';
import {Cell} from '@enact/ui/Layout';
import React from 'react';

const style = {
	flex: '1 1 100%',
	display: 'flex',
	flexDirection: 'column',
	width: '100%',
	height: '100%'
};

// FIXME: `<br /> has been added between the `Header` and `Button`. But it would be better to add a margin in the Panel's body.
const HeaderView = () => (
	<div style={style}>
		<Cell>
			<Panel>
				<Header title="Header Title 0" />
				<br />
				<Button>Text 0</Button>
			</Panel>
			<hr />
		</Cell>
		<Cell>
			<Panel>
				<Header
					subtitle="Subtitle"
					title="Header Title 1"
				/>
				<br />
				<Button>Text 1</Button>
			</Panel>
			<hr />
		</Cell>
	</div>
);

export default HeaderView;
