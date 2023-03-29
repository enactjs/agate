import {useCallback, useContext} from 'react';
import {Link} from 'react-router-dom';

// Components
import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import CheckboxItem from '@enact/agate/CheckboxItem';
import ColorPicker from '@enact/agate/ColorPicker';
import DateTimePicker from '@enact/agate/DateTimePicker';
import Dropdown from '@enact/agate/Dropdown';
import Heading from '@enact/agate/Heading';
import Scroller from '@enact/agate/Scroller';
import Slider from '@enact/agate/Slider';
import SwitchItem from '@enact/agate/SwitchItem';

import {AppContext} from '../ThemedApp';

import css from './MainPanel.module.less';

const MainPanel = () => {
	const {fakeTime, setAccent, setHighlight, setFakeTime, setSkin} = useContext(AppContext);

	const handleToggle = useCallback((e) => {
		setFakeTime(e.selected);
	}, [setFakeTime]);

	const handleSelect = useCallback((e) => {
		setSkin(e.data.toLowerCase());
	}, [setSkin]);

	const handleAccentColorPickerChange = useCallback((e) => {
		setAccent(e.value);
	}, [setAccent]);

	const handleHighlightColorPickerChange = useCallback((e) => {
		setHighlight(e.value);
	}, [setHighlight]);

	return (
		<Scroller direction="vertical">
			<div className={css.container}>
				<div className={css.header}>
					<Heading className={css.heading}>Main Panel</Heading>
					<Link to="/secondView">
						<Button icon="arrowlargeright" size="small" />
					</Link>
				</div>
				<BodyText size="small">
					This sample showcases the functionality of `useLinearSkinColor` hook. By providing an `accent` and a
					`highlight` color, this hook returns new generated colors
					by increasing/decreasing their luminosity or saturation values, depending on the time of the day. It
					sets the day mode with a light background starting from
					6:00AM and sets the night mode with a dark background at 18:00PM.
				</BodyText>
				<div className={css.settings}>
					<CheckboxItem label="User real time" inline onToggle={handleToggle} selected={fakeTime} />
					<Dropdown onSelect={handleSelect} title="Select a skin" width="small">
						{['Carbon', 'Cobalt', 'Copper', 'Electro', 'Gallium', 'Titanium', 'Silicon']}
					</Dropdown>
				</div>
				<div className={css.demo}>
					<div className={css.colorPickers}>
						<span>Accent</span>
						<ColorPicker onChange={handleAccentColorPickerChange} style={{marginBottom: '42px'}}>
							{['#8fd43a', '#8c81ff', '#a47d66', '#0359f0', '#8b7efe', '#f1304f', '#a6a6a6']}
						</ColorPicker>
						<span>Highlight</span>
						<ColorPicker onChange={handleHighlightColorPickerChange}>
							{['#6abe0b', '#ffffff', '#ffffff', '#ff8100', '#e16253', '#9e00d8', '#2a48ca']}
						</ColorPicker>
					</div>
					<div className={css.components}>
						<div style={{marginBottom: '12px'}}>
							<Button size="small">Click</Button>
							<Button disabled selected size="small">Disabled</Button>
							<Button size="small">Selected</Button>
							<Button disabled selected size="small">Disabled</Button>
						</div>
						<SwitchItem className={css.previewSwitchItem} label="label" size="small">SwitchItem</SwitchItem>
						<DateTimePicker />
						<Slider />
					</div>
				</div>
			</div>
		</Scroller>
	);
};

export default MainPanel;
