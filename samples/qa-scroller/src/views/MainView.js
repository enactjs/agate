import DatePicker from '@enact/agate/DatePicker';
import {Header} from '@enact/agate/Header';
import Input from '@enact/agate/Input';
import Item from '@enact/agate/Item';
import {Panel} from '@enact/agate/Panels';
import Picker from '@enact/agate/Picker';
import RadioItem from '@enact/agate/RadioItem';
import Scroller from '@enact/agate/Scroller';
import TimePicker from '@enact/agate/TimePicker';
import Group from '@enact/ui/Group';
import {Layout} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import {useCallback, useState} from 'react';

import Controls from '../components/Controls';

const
	airports = [
		'San Francisco Airport Terminal Gate 1',
		'Boston Airport Terminal Gate 2',
		'Tokyo Airport Terminal Gate 3',
		'נמל התעופה בן גוריון טרמינל הבינלאומי'
	],
	data = [],
	itemData = [];

for (let i = 0; i < 20; i++) {
	data.push(airports[i % 4]);
}

for (let i = 0; i < 50; i++) {
	itemData.push(`Item ${i}`);
}

const MainView = () => {
	const [focusableScrollbar, setFocusableScrollbar] = useState(false);
	const [height, setHeight] = useState(2000);
	const [nativeScroll, setNativeScroll] = useState(true);
	const [width, setWidth] = useState(1000);

	const getScaledSize = (size) => ri.scale(parseInt(size) || 0);

	const handleFocusableScrollbar = useCallback(() => setFocusableScrollbar(!focusableScrollbar), [focusableScrollbar]);
	const handleHeight = useCallback(({value}) => setHeight(value), []);
	const handleScrollMode = useCallback(({selected: selNativeScroll}) => setNativeScroll(selNativeScroll), []);
	const handleWidth = useCallback(({value}) => setWidth(value), []);

	return (
		<Panel>
			<Header hideLine title="Scroller" />
			<Layout>
				<Controls
					handleFocusableScrollbar={handleFocusableScrollbar}
					handleHeight={handleHeight}
					handleScrollMode={handleScrollMode}
					handleWidth={handleWidth}
					height={height}
					nativeScroll={nativeScroll}
					width={width}
				/>
			</Layout>
			<hr />
			<Scroller
				focusableScrollbar={focusableScrollbar}
				horizontalScrollbar="visible"
				key={nativeScroll ? 'native' : 'translate'}
				scrollMode={nativeScroll ? 'native' : 'translate'}
				style={{height: '90%'}}
			>
				<div style={{height: `${getScaledSize(height)}px`, width: `${getScaledSize(width)}px`}}>
					<Input
						defaultValue="Initial value"
						title="Input with defaultValue"
					/>
					<br />
					<Picker
						orientation="vertical"
						width="medium"
					>
						{airports}
					</Picker>
					<br />
					<DatePicker
						title="DatePicker"
					/>
					<br />
					<RadioItem> FirstLongTextWithSpace FirstLongTextWithSpace FirstLongTextWithSpace FirstLongTextWithSpace FirstLongTextWithSpace </RadioItem>
					<RadioItem disabled> Default disabled Looooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooong Text </RadioItem>
					<Group childComponent={Item}>
						{itemData}
					</Group>
					<TimePicker
						title="TimePicker"
					/>
				</div>
			</Scroller>
		</Panel>
	);

};

export default MainView;
