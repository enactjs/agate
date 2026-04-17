import BodyText from '@enact/agate/BodyText';
import Button from '@enact/agate/Button';
import CheckboxItem from '@enact/agate/CheckboxItem';
import Header from '@enact/agate/Header';
import {Panel, Panels} from '@enact/agate/Panels';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import {setFocusEffectClass} from '@enact/spotlight/SpotlightRootDecorator';
import {Cell, Layout, Row} from '@enact/ui/Layout';
import {useCallback, useState} from 'react';

import css from './App.module.less';


const App = (props) => {
	const [hasFocusEffectClass, setHasFocusEffectClass] = useState(false);

	const onToggleDisabled = useCallback(() => {
		const next = !hasFocusEffectClass;
		setHasFocusEffectClass(next);
		setFocusEffectClass(next ? css.focusClass : null);
	}, [hasFocusEffectClass]);

	return (
		<Panels {...props}>
			<Panel>
				<Header>
					<title>QA Sample - Focus Effect Class</title>
				</Header>

						<CheckboxItem onClick={onToggleDisabled}>Enable focusEffectClass</CheckboxItem>


				<Row>
					<Button className={css.button2}>
						Button with general focus effect class
					</Button>
					<BodyText className={css.bodyText}>When focusEffectClass is active, this Button should have larger font size on focus</BodyText>
				</Row>
				<Row>
					<Button className={css.button1}>
						Button with data-spotlight-focused attribute
					</Button>
					<BodyText className={css.bodyText}>This Button should have dedicated red color on focus. When focusEffectClass is active, it should have larger font-size</BodyText>
				</Row>
			</Panel>
		</Panels>
	);
};

export default ThemeDecorator(App);
