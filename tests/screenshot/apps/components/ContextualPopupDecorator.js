import Button from '../../../../Button';
import ContextualPopupDecorator from '../../../../ContextualPopupDecorator';

const ContextualButton = ContextualPopupDecorator(Button);
const Popup = () => <div>hello</div>;

const ContextualPopupDecoratorTests = [
	{
		component: <ContextualButton open popupComponent={Popup}>Button</ContextualButton>,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ContextualButton open direction="right middle" popupComponent={Popup}>Button</ContextualButton>,
		wrapper: {
			padded: true
		}
	},
	{
		component: <ContextualButton open popupComponent={Popup} showCloseButton>Button</ContextualButton>,
		wrapper: {
			padded: true
		}
	}
];

export default ContextualPopupDecoratorTests;
