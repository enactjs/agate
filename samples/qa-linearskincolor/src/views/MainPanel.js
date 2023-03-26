import Button from '@enact/agate/Button';
import CheckboxItem from '@enact/agate/CheckboxItem';
import Dropdown from '@enact/agate/Dropdown'
import {useCallback, useContext} from 'react';
import {AppContext} from '../ThemedApp';

const MainPanel = () => {
	const {realTime, setRealTime, setSkin} = useContext(AppContext);

	const handleToggle = useCallback((e) => {
		setRealTime(e.selected);
	}, [setRealTime]);

	const handleSelect = useCallback((e) => {
		setSkin(e.data.toLowerCase());
	}, [setSkin]);

	return (
		<div>
			Panel for LinearSkinColor
			<Button>Hello</Button>
			<CheckboxItem label="User real time" inline onToggle={handleToggle} selected={realTime}/>
			<Dropdown onSelect={handleSelect} title="Select a skin">
				{['Carbon', 'Cobalt', 'Copper', 'Electro', 'Gallium', 'Titanium', 'Silicon']}
			</Dropdown>
		</div>
	)
}

export default MainPanel;
