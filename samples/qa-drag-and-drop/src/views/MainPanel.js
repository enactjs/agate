/* eslint-disable react/jsx-no-bind */

import {useState} from 'react';

import Button from '@enact/agate/Button';
import Heading from '@enact/agate/Heading';
import Item from '@enact/agate/Item';
import {Panel} from '@enact/agate/Panels';

import CustomLayout from '../components/CustomLayout';

import css from './MainPanel.module.less';

const MainPanel = (props) => {
	const [arrangement, setArrangement] = useState({bottom: "bottom", center: "center", top: "top"});
	const [editLayout, setEditLayout] = useState(false);

	const handleArrangement = () => {
		setArrangement(arrangement);
	};

	const handleEditing = () => {
		setEditLayout(!editLayout);
	};

	return (
		<Panel {...props} className={css.mainPanel}>
			<Heading showLine>
				Agate Drag & Drop
			</Heading>
			<CustomLayout arrangeable={editLayout} arrangement={arrangement} onArrange={handleArrangement}>
				<top>
					<Item className={css.firstItem}>Drag me</Item>
				</top>
				<center />
				<bottom>
					<Item className={css.secondItem}>Drag me too</Item>
				</bottom>
			</CustomLayout>
			<Button onClick={handleEditing}>{!editLayout ? 'Edit Layout' : 'Done Editing'}</Button>
		</Panel>
	);
};

export default MainPanel;
