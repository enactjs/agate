import Heading from '@enact/agate/Heading';
import RadioItem from '@enact/agate/RadioItem';
import Group from '@enact/ui/Group';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const IntentSelectRadioItem = () => {
	const [selected, setSelected] = useState(0);

	const handleSelect = useCallback((e) => setSelected(e.selected), []);

	return (
		<CommonView title="Intent to select RadioItem">
			<Heading>RadioItem</Heading>
			<RadioItem data-testid="apple">사과</RadioItem>
			<Heading>RadioItem Group - radio selection</Heading>
			<Group
				childComponent={RadioItem}
				onSelect={handleSelect}
				select="radio"
				selectedProp="selected"
				selected={selected}
			>
				{[
					'사진',
					'바나나',
					'음악'
				]}
			</Group>
		</CommonView>
	);
};

export default IntentSelectRadioItem;
