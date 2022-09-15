import CheckboxItem from '@enact/agate/CheckboxItem';
import Heading from '@enact/agate/Heading';
import Group from '@enact/ui/Group';
import {useCallback, useState} from 'react';

import CommonView from '../../components/CommonView';

const IntentSelectCheckboxItem = () => {
	const [selected, setSelected] = useState([0, 1]);

	const handleSelect = useCallback((e) => setSelected(e.selected), []);

	return (
		<CommonView title="Intent to select CheckboxItem">
			<Heading>CheckboxItem</Heading>
			<CheckboxItem data-testid="orange">오렌지</CheckboxItem>
			<Heading>CheckboxItem Group - multiple selection</Heading>
			<Group
				childComponent={CheckboxItem}
				onSelect={handleSelect}
				select="multiple"
				selected={selected}
				selectedProp="selected"
			>
				{[
					'사과',
					'바나나',
					'호두'
				]}
			</Group>
			<Heading>FormCheckboxItem</Heading>
		</CommonView>
	);

};

export default IntentSelectCheckboxItem;
