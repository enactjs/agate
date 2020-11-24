import Button from '../../../../Button';
import ContextualPopupDecorator from '../../../../ContextualPopupDecorator';
import ThemeDecorator from '../../../../ThemeDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';

const ContextualButton = ContextualPopupDecorator(Button);

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const renderPopup1 = () => (
	<Button id="popupButton1">Hello Contextual Popup1</Button>
);
const renderPopup2 = () => (
	<Button id="popupButton2">Hello Contextual Popup2</Button>
);

class app extends Component {
	state = {
		button1State: false,
		button2State: false
	};

	clickHandler = (st) => this.setState(st);

	render () {
		const {button1State, button2State} = this.state;

		return (
			<div {...this.props}>
				<ContextualButton
					id="button1"
					onClick={() => this.clickHandler({button1State: !button1State})}
					onClose={() => this.clickHandler({button1State: false})}
					open={button1State}
					popupComponent={renderPopup1}
					spotlightRestrict="self-only"
				>
					Contextual Popup Button1
				</ContextualButton>
				<ContextualButton
					id="button2"
					onClick={() => this.clickHandler({button2State: !button2State})}
					onClose={() => this.clickHandler({button2State: false})}
					open={button2State}
					popupComponent={renderPopup2}
					spotlightRestrict="self-only"
				>
					Contextual Popup Button2
				</ContextualButton>
			</div>
		);
	}
}

export default ThemeDecorator(app);
