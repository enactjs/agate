import Button from '../../../../Button';
import PopupMenu from '../../../../PopupMenu';
import ThemeDecorator from '../../../../ThemeDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const Container = SpotlightContainerDecorator('div');

const style = {
	main: {
		display: 'grid',
		'gridTemplateColumns': 'repeat(4, 1fr)',
		'gridGap': '6px'
	}
};

spotlight.setPointerMode(false);

class app extends Component {

	state = {
		open1: false,
		open2: false,
		open3: false,
		open4: false,
		open5: false,
		open6: false,
		open7: false,
		open8: false
	};

	clickHandler = (st) =>  this.setState(st);

	togglePopup = () => {
		this.setState({
			open8: true
		});

		setTimeout(() => {
			this.setState({
				open8: false
			});
		}, 200);
	};

	render () {
		return (
			<div id="popupMenuMain" {...this.props}>
				<p>
					UI testing for PopupMenu Component 1. autoDismiss 2. noAutoDismiss 3. no Components 4. noAnimation
					5. with closeButton 6. with title 7. with closeButtonLabel 8. toggle PopupMenu
				</p>
				<div style={style.main}>
					<Button id="buttonPopupMenu1" onClick={() => this.clickHandler({open1: true})}>AutoDismiss</Button>
					<Button id="buttonPopupMenu2" onClick={() => this.clickHandler({open2: true})}>noAutoDismiss</Button>
					<Button id="buttonPopupMenu3" onClick={() => this.clickHandler({open3: true})}>no Component</Button>
					<Button id="buttonPopupMenu4" onClick={() => this.clickHandler({open4: true})}>noAnimation</Button>
					<Button id="buttonPopupMenu5" onClick={() => this.clickHandler({open5: true})}>closeButton</Button>
					<Button id="buttonPopupMenu6" onClick={() => this.clickHandler({open6: true})}>with Title</Button>
					<Button id="buttonPopupMenu7" onClick={() => this.clickHandler({open7: true})}>closeButtonLabel</Button>
					<Button id="buttonPopupMenu8" onClick={this.togglePopup}>toggle Open</Button>
				</div>
				<PopupMenu
					id="popupMenu1"
					open={this.state.open1}
					onClose={() => this.clickHandler({open1: false})}
				>
					<div>PopupMenu with AutoDismiss</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open1: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open1: false})}>Cancel</Button>
					</Container>
				</PopupMenu>
				<PopupMenu
					id="popupMenu2"
					open={this.state.open2}
					noAutoDismiss
					onClose={() => this.clickHandler({open2: false})}
				>
					<div>PopupMenu without AutoDismiss</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open2: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open2: false})}>Cancel</Button>
					</Container>
				</PopupMenu>
				<PopupMenu
					id="popupMenu3"
					open={this.state.open3}
					onClose={() => this.clickHandler({open3: false})}
				>
					<div>PopupMenu with no Component</div>
				</PopupMenu>
				<PopupMenu
					id="popupMenu4"
					open={this.state.open4}
					noAnimation
					onClose={() => this.clickHandler({open4: false})}
				>
					<div>PopupMenu without Animation</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open4: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open4: false})}>Cancel</Button>
					</Container>
				</PopupMenu>
				<PopupMenu
					closeButton
					id="popupMenu5"
					open={this.state.open5}
					onClose={() => this.clickHandler({open5: false})}
				>
					<div>PopupMenu with Close button</div>
				</PopupMenu>
				<PopupMenu
					id="popupMenu6"
					open={this.state.open6}
					onClose={() => this.clickHandler({open6: false})}
					title="PopupMenu title"
				>
					<div>PopupMenu with title</div>
					<br />
					<Container>
						<Button id="buttonOK" onClick={() => this.clickHandler({open6: false})}>OK</Button>
						<Button id="buttonCancel" onClick={() => this.clickHandler({open6: false})}>Cancel</Button>
					</Container>
				</PopupMenu>
				<PopupMenu
					closeButton
					closeButtonLabel="Click me!"
					id="popupMenu7"
					open={this.state.open7}
					onClose={() => this.clickHandler({open7: false})}
				>
					<div>Popup with closeButtonLabel</div>
				</PopupMenu>
				<PopupMenu
					id="popupMenu8"
					open={this.state.open8}
				>
					<Button>close</Button>
				</PopupMenu>
			</div>
		);
	}
}
export default ThemeDecorator(app);
