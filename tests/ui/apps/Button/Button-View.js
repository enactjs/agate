import Button from '../../../../Button';
import ThemeDecorator from '../../../../ThemeDecorator';
import React from 'react';
import spotlight from '@enact/spotlight';

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

const app = (props) => <div {...props}>
	<div>
		<Button id="button1" style={{margin: '12px'}}>
			Default Button
		</Button>
		<Button id="button2" disabled style={{margin: '12px'}}>
			Button disabled
		</Button>
		<Button id="button3" backgroundOpacity="transparent" style={{margin: '12px'}}>
			Transparent Button
		</Button>
		<Button id="button4" icon="check" style={{margin: '12px'}}>
			Button icon check
		</Button>
		<Button id="button5" icon="check" iconPosition="after" style={{margin: '12px'}}>
			Button icon position after
		</Button>
		<Button id="button6" minWidth={false} style={{margin: '12px'}}>
			Button minWidth false
		</Button>
		<Button id="button7" size="small" style={{margin: '12px'}}>
			Button size small
		</Button>
		<Button id="button8" badge={10} badgeColor="#a6d608" style={{margin: '12px'}}>
			Button with badge
		</Button>
		<Button id="button9" highlighted style={{margin: '12px'}}>
			Button highlighted
		</Button>
		<Button id="button10" joinedPosition="left" style={{margin: '12px 0 12px 12px'}}>
			Button joined left
		</Button>
		<Button id="button11" joinedPosition="right" style={{margin: '12px 12px 12px 0'}}>
			Button joined right
		</Button>
		<Button id="button12" icon="home" style={{margin: '12px'}} />
	</div>
</div>;

export default ThemeDecorator(app);
