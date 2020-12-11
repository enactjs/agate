import Button from '../../../../Button';
import ThemeDecorator from '../../../../ThemeDecorator';
import TooltipDecorator from '../../../../TooltipDecorator';
import React, {Component} from 'react';
import spotlight from '@enact/spotlight';

const TooltipButton = TooltipDecorator({tooltipDestinationProp: 'decoration'}, Button);

// NOTE: Forcing pointer mode off so we can be sure that regardless of webOS pointer mode the app
// runs the same way
spotlight.setPointerMode(false);

class app extends Component {

	render () {
		return (
			<div style={{padding: '40px'}}>
				<TooltipButton
					id="tooltipButton1"
					tooltipPosition="right middle"
					tooltipText="Hello Tooltip Button 1"
				>
					Tooltip Button 1
				</TooltipButton>
				<TooltipButton
					id="tooltipButton2"
					backgroundOpacity="transparent"
					selected
					tooltipText="Hello Tooltip Button 2"
					tooltipDelay={1000}
				>
					Tooltip Button 2
				</TooltipButton>
				<TooltipButton
					id="tooltipButton3"
					disabled
					size="small"
					tooltipText="Hello Tooltip Button 3"
				>
					Tooltip Button 3
				</TooltipButton>
			</div>
		);
	}
}

export default ThemeDecorator(app);
