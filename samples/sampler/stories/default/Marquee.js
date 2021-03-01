import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
import PropTypes from 'prop-types';
import {storiesOf} from '@storybook/react';

import Marquee from '@enact/agate/Marquee';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';

const I18nMarqueeBase = ({rtl}) => {
	// fn to parse the padding value which is invoked later to keep the knob ordered
	const spacing = () => {
		const value = text('marqueeSpacing', Marquee, '50%');
		if (value && value.indexOf('%') > 0) {
			return value;
		}

		return Number.parseInt(value);
	};

	const marqueeText = rtl ? 'قفز الثعلب البني السريع فوق الكلب الكسول. طائر الفاصوليا يطير عند غروب الشمس.' :
		'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.';

	const disabled = boolean('disabled', Marquee);

	return (
		<section>
			<Marquee
				alignment={select('alignment', [null, 'left', 'right', 'center'], Marquee)}
				disabled={disabled}
				forceDirection={select('forceDirection', [null, 'rtl', 'ltr'], Marquee)}
				marqueeDelay={number('marqueeDelay', Marquee, 1000)}
				marqueeDisabled={boolean('marqueeDisabled', Marquee)}
				marqueeOn={select('marqueeOn', ['hover', 'render'], Marquee, 'render')}
				marqueeOnRenderDelay={1000}
				marqueeResetDelay={number('marqueeResetDelay', Marquee, 1000)}
				marqueeSpacing={spacing()}
				marqueeSpeed={number('marqueeSpeed', Marquee, 60)}
				style={{width: '600px'}}
			>
				{marqueeText}
			</Marquee>
			{disabled ? <p style={{fontSize: '70%', fontStyle: 'italic'}}><sup>*</sup>Marquee does not visually respond to <code>disabled</code> state.</p> : <p />}
		</section>
	);
};

I18nMarqueeBase.propTypes = {
	rtl: PropTypes.bool
};

const I18nMarquee = I18nContextDecorator({rtlProp: 'rtl'}, I18nMarqueeBase);

storiesOf('Agate', module)
	.add(
		'Marquee',
		() => (<I18nMarquee />),
		{
			text: 'The basic Marquee'
		}
	);
