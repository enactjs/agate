/* eslint-disable react/jsx-no-bind */

import Button from '@enact/agate/Button';
import {ResponsiveBox} from '@enact/agate/DropManager';
import Heading from '@enact/agate/Heading';
import Item from '@enact/agate/Item';
import {Panel} from '@enact/agate/Panels';
import Layout, {Cell} from '@enact/ui/Layout';
import {scaleToRem} from '@enact/ui/resolution';
import {useState} from 'react';

import CustomLayout from '../components/CustomLayout';

import * as css from './MainPanel.module.less';

const ResponsiveLayout = ResponsiveBox(({containerShape, ...rest}) => {
	const orientation = (containerShape.orientation === 'portrait') ? 'vertical' : 'horizontal';
	let axisAlign = 'space-evenly';

	return (
		<Layout align={'center ' + axisAlign} orientation={orientation} {...rest} />
	);
});

const MainPanel = (props) => {
	const [arrangement, setArrangement] = useState({bottom: "bottom", center: "center", top: "top"});
	const [editLayout, setEditLayout] = useState(false);

	const handleArrangement = (ev) => {
		setArrangement(ev.arrangement);
	};

	const handleEditing = () => {
		setEditLayout(!editLayout);
	};

	return (
		<Panel {...props} className={css.mainPanel}>
			<Heading showLine>
				Agate Drag & Drop
			</Heading>
			<CustomLayout arrangeable={editLayout} arrangement={arrangement} onArrange={handleArrangement} style={{height: scaleToRem(690)}}>
				<top>
					<Item className={css.firstItem} css={css}>Drag me</Item>
				</top>
				<center>
					<ResponsiveLayout style={{height: scaleToRem(300)}}>
						<Cell component={Button} shrink>1</Cell>
						<Cell component={Button} shrink>2</Cell>
					</ResponsiveLayout>
				</center>
				<bottom>
					<Item className={css.secondItem} css={css}>Drag me too</Item>
				</bottom>
			</CustomLayout>
			<Button onClick={handleEditing}>{!editLayout ? 'Edit Layout' : 'Done Editing'}</Button>
		</Panel>
	);
};

export default MainPanel;
