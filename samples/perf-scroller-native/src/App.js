import Item from '@enact/agate/Item';
import Scroller from '@enact/agate/Scroller';
import ThemeDecorator from '@enact/agate/ThemeDecorator';

import * as css from './App.module.less';

const
	items = [],
	languages = [
		'한국어 - 한국',
		'English - United States',
		'Português - Brasil',
		'Português - Portugal',
		'Čeština - Česká republika',
		'Dansk - Danmark',
		'Deutsch - Deutschland',
		'Ελληνική γλώσσα - Ελλάδα',
		'Español - España',
		'Suomi - Suomi'
	];

for (let i = 0; i < 100; i++) {
	items.push(
		<Item className={css.item} key={i}>
			{(('00' + i).slice(-3) + ' - ' + languages[i % 10])}
		</Item>
	);
}

const ScrollerSample = (props) => {
	return (
		<Scroller {...props} scrollMode="native">
			{items}
		</Scroller>
	);
};

export default ThemeDecorator(ScrollerSample);
