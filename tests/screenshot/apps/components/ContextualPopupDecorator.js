import Button from '../../../../Button';
import ContextualPopupDecorator from '../../../../ContextualPopupDecorator';

import {withConfig} from './utils';

const ContextualButton = ContextualPopupDecorator(Button);
const Popup = () => <div>hello</div>;

const wrapper = {
	padded: '240px'
};

const ContextualPopupDecoratorTests = [
	...withConfig({wrapper}, [
		<ContextualButton open popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="above center" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="above left" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="above right" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="below center" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="below left" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="below right" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="left middle" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="left top" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="left bottom" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="right middle" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="right top" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open direction="right bottom" popupComponent={Popup}>Button</ContextualButton>,
		<ContextualButton open popupComponent={Popup} showCloseButton>Button</ContextualButton>
	])
];

export default ContextualPopupDecoratorTests;
