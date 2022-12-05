import Button from '@enact/agate/Button';
import CheckboxItem from '@enact/agate/CheckboxItem';
import Header from '@enact/agate/Header';
import Input from '@enact/agate/Input';
import {Panel} from '@enact/agate/Panels';
import VirtualList from '@enact/agate/VirtualList';
import {Cell, Layout, Row} from '@enact/ui/Layout';
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

	const rowWidth = typeof window !== 'undefined' ? `${ri.scaleToRem(window.innerWidth)}` : `${ri.scaleToRem(1920)}`;

	return (
		<Panel {...rest}>
			<Header hideLine title="Virtual List" />
			<Layout>
				<Row style={{width: rowWidth}} wrap>
					<Cell align="center" shrink>
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
					<Cell align="center" shrink>
						<Button onClick={onChangeDataSize} size="small">Set DataSize</Button>
					</Cell>
					<CheckboxItem onClick={onToggleDisabled} size="small" style={{height: '2em', minWidth: '8em'}}>Disabled Items</CheckboxItem>
					<CheckboxItem onClick={onToggleChildProps} size="small" style={{height: '2em', minWidth: '8em'}}>Child Props</CheckboxItem>
					<ScrollModeSwitch defaultSelected={nativeScroll} onToggle={onChangeScrollMode} style={{height: '2em', minWidth: '8em'}} />
					<LocaleSwitch style={{height: '2em', minWidth: '8em'}} />
				</Row>
			</Layout>
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
