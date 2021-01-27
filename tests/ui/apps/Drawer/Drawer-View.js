import BodyText from '../../../../BodyText';
import Button from '../../../../Button';
import Drawer from '../../../../Drawer';
import Heading from '../../../../Heading';
import ThemeDecorator from '../../../../ThemeDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';

const Container = SpotlightContainerDecorator('div');

spotlight.setPointerMode(false);

class app extends Component {

	state = {
		open1: false,
		open2: false,
		open3: false,
		open4: false
	};

	clickHandler = (st) =>  this.setState(st);

	render () {
		return (
			<div id="drawerMain" {...this.props}>
				<p>
					UI testing for Drawer Component
					1. showLine=false 2. noAnimation 3. scrimType=transparent 4. scrimType=none
				</p>
				<div>
					<Button id="buttonDrawer1" onClick={() => this.clickHandler({open1: true})}>No Line</Button>
					<Button id="buttonDrawer2" onClick={() => this.clickHandler({open2: true})}>No Animation</Button>
					<Button id="buttonDrawer3" onClick={() => this.clickHandler({open3: true})}>Transparent scrim</Button>
					<Button id="buttonDrawer4" onClick={() => this.clickHandler({open4: true})}>No scrim</Button>
				</div>
				<Drawer
					id="drawer1"
					noAnimation={false}
					onHide={() => this.clickHandler({open1: false})}
					open={this.state.open1}
				>
					<header>
						<Heading
							color="#FDC902"
							size="small"
							spacing="small"
						>
							Drawer with no line
						</Heading>
					</header>
					<BodyText>
						This is a drawer with no line in Heading.
					</BodyText>
					<footer>
						<Container>
							<Button id="buttonOK" onClick={() => this.clickHandler({open1: false})} size="smallest">OK</Button>
							<Button id="buttonCancel" onClick={() => this.clickHandler({open1: false})} size="smallest">Cancel</Button>
						</Container>
					</footer>
				</Drawer>
				<Drawer
					id="drawer2"
					noAnimation
					onHide={() => this.clickHandler({open2: false})}
					open={this.state.open2}
				>
					<header>
						<Heading
							color="#FDC902"
							showLine
							size="small"
							spacing="small"
						>
							Drawer without animation
						</Heading>
					</header>
					<BodyText>
						This is a drawer with no animation.
					</BodyText>
					<footer>
						<Container>
							<Button id="buttonOK" onClick={() => this.clickHandler({open2: false})} size="smallest">OK</Button>
							<Button id="buttonCancel" onClick={() => this.clickHandler({open2: false})} size="smallest">Cancel</Button>
						</Container>
					</footer>
				</Drawer>
				<Drawer
					id="drawer3"
					noAnimation={false}
					onHide={() => this.clickHandler({open3: false})}
					open={this.state.open3}
					scrimType="transparent"
				>
					<header>
						<Heading
							color="#FDC902"
							showLine
							size="small"
							spacing="small"
						>
							Drawer with transparent scrim
						</Heading>
					</header>
					<BodyText>
						This is a drawer with transparent scrim.
					</BodyText>
					<footer>
						<Container>
							<Button id="buttonOK" onClick={() => this.clickHandler({open3: false})} size="smallest">OK</Button>
							<Button id="buttonCancel" onClick={() => this.clickHandler({open3: false})} size="smallest">Cancel</Button>
						</Container>
					</footer>
				</Drawer>
				<Drawer
					id="drawer4"
					noAnimation={false}
					onHide={() => this.clickHandler({open4: false})}
					open={this.state.open4}
					scrimType="none"
				>
					<header>
						<Heading
							color="#FDC902"
							showLine
							size="small"
							spacing="small"
						>
							Drawer without scrim
						</Heading>
					</header>
					<BodyText>
						This is a drawer with no scrim.
					</BodyText>
					<footer>
						<Container>
							<Button id="buttonOK" onClick={() => this.clickHandler({open4: false})} size="smallest">OK</Button>
							<Button id="buttonCancel" onClick={() => this.clickHandler({open4: false})} size="smallest">Cancel</Button>
						</Container>
					</footer>
				</Drawer>
			</div>
		);
	}
}
export default ThemeDecorator(app);
