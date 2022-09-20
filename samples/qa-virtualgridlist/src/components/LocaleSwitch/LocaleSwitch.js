import CheckboxItem from '@enact/agate/CheckboxItem';
import {useI18nContext} from '@enact/i18n/I18nDecorator';
import {useCallback} from 'react';

const LocaleSwitch = (props) => {
	const {rtl, updateLocale} = useI18nContext();
	const onClick = useCallback(() => {
		updateLocale(!rtl ? 'ar-SA' : 'en-US');
	}, [rtl, updateLocale]);

	return (
		<CheckboxItem {...props} onClick={onClick} size="small">RTL</CheckboxItem>
	);
};

export default LocaleSwitch;
