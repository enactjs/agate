import Button from '@enact/agate/Button';
import CheckboxItem from '@enact/agate/CheckboxItem';
import Header from '@enact/agate/Header';
import Input from '@enact/agate/Input';
import {Panel} from '@enact/agate/Panels';
import VirtualList from '@enact/agate/VirtualList';
import {Cell, Column, Row} from '@enact/ui/Layout';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import {useCallback, useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';

import ListItem from '../components/ListItem';
import LocaleSwitch from '../components/LocaleSwitch';
import ScrollModeSwitch from '../components/ScrollModeSwitch';
import {setData} from '../store';

import css from './MainPanel.module.less';

const childProps = {text: ' child props'};

const MainPanel = ({...rest}) => {
	const dispatch = useDispatch();
	const [hasChildProps, setHasChildProps] = useState(false);
	const [isDisabled, setIsDisabled] = useState(false);
	const [nativeScroll, setNativeScroll] = useState(true);
	const [value, setValue] = useState('');

	const listItems = useSelector(({listItems:storeListItems}) => storeListItems);
	const changeData = useCallback((dataSize, isDisabledData) => dispatch(setData(dataSize, isDisabledData)), [dispatch]);

	useEffect(() => {
		changeData(200, false);
	}, [changeData]);

	const handleChange = useCallback((param) => setValue(param.value), []);

	const onChangeDataSize = useCallback(() => {
		const dataSize = parseInt(value) || 0;
		changeData(dataSize, isDisabled);
	}, [changeData, isDisabled, value]);

	const onChangeScrollMode = useCallback(({selected: selNativeScroll}) => setNativeScroll(selNativeScroll), []);

	const onToggleChildProps = useCallback(() => setHasChildProps(!hasChildProps), [hasChildProps]);

	const onToggleDisabled = useCallback(() => {
		changeData(listItems.length, !isDisabled);
		return setIsDisabled(!isDisabled);
	}, [changeData, isDisabled, listItems.length]);

	const renderItem = useCallback(({index, text, ...restItem}) => {
		return (
			<ListItem {...restItem} index={index}>
				{listItems[index].content + (text || '')}
			</ListItem>
		);
	}, [listItems]);

	const rowWidth = typeof window !== 'undefined' ? `${ri.scale(window.innerWidth)}px` : `${ri.unit(ri.scale(1920), 'rem')}`;

	return (
		<Panel {...rest}>
			<Header hideLine title="">
				<Column>
					<h1>Virtual List</h1>
					<Row style={{width: rowWidth}}>
						<Cell shrink>
							<label>DataSize:</label>
							<Input
								onChange={handleChange}
								placeholder={`${listItems.length}`}
								size="small"
								style={{width: '5em'}}
								type="number"
								value={value}
							/>
						</Cell>
						<Cell shrink>
							<Button onClick={onChangeDataSize} size="small">Set DataSize</Button>
						</Cell>
						<Cell>
							<CheckboxItem onClick={onToggleDisabled} size="small">Disabled Items</CheckboxItem>
						</Cell>
						<Cell>
							<CheckboxItem onClick={onToggleChildProps} size="small">Child Props</CheckboxItem>
						</Cell>
						<Cell>
							<ScrollModeSwitch defaultSelected={nativeScroll} onToggle={onChangeScrollMode} />
						</Cell>
						<Cell>
							<LocaleSwitch />
						</Cell>
					</Row>
				</Column>
			</Header>
			<hr />
			<VirtualList
				className={css.verticalPadding}
				childProps={hasChildProps ? childProps : null}
				dataSize={listItems.length}
				itemRenderer={renderItem}
				itemSize={ri.scale(78)}
				key={nativeScroll ? 'native' : 'translate'}
				scrollMode={nativeScroll ? 'native' : 'translate'}
			/>
		</Panel>
	);
};

MainPanel.propTypes = {
	nativeScroll: PropTypes.bool
};

export default MainPanel;
