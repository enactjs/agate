import kind from '@enact/core/kind';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/controls';
import PropTypes from 'prop-types';
import Marquee from '@enact/agate/Marquee';
import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';

Marquee.displayName = 'Marquee';
const Config = mergeComponentMetadata('Marquee', Marquee);

const I18nMarqueeBase = kind({
	name: 'I18nMarquee',

	propTypes: {
		rtl: PropTypes.bool
	},

	render: ({rtl, ...rest}) => {
		const marqueeText = rtl ? 'قفز الثعلب البني السريع فوق الكلب الكسول. طائر الفاصوليا يطير عند غروب الشمس.' : 'The quick brown fox jumped over the lazy dog. The bean bird flies at sundown.';

		return (
			<Marquee {...rest}>
				{marqueeText}
			</Marquee>
		);
	}
});

const I18nMarquee = I18nContextDecorator({rtlProp: 'rtl'}, I18nMarqueeBase);

export default {
	title: 'Agate/Marquee',
	component: 'Marquee'
};

export const _Marquee = (args) => {
	const value = args['marqueeSpacing'];
	const spacing = () => {
		if (value && value.indexOf('%') > 0) {
			return value;
		}

		return Number.parseInt(value);
	};
	const disabled = args['disabled'];

	return (
		<section>
			<I18nMarquee
				alignment={args['alignment']}
				disabled={args['disabled']}
				forceDirection={args['forceDirection']}
				marqueeDelay={args['marqueeDelay']}
				marqueeDisabled={args['marqueeDisabled']}
				marqueeOn={args['marqueeOn']}
				marqueeOnRenderDelay={1000}
				marqueeResetDelay={args['marqueeResetDelay']}
				marqueeSpacing={spacing(args['marqueeSpacing'])}
				marqueeSpeed={args['marqueeSpeed']}
				style={{width: '600px'}}
			/>
			{disabled ? <p style={{fontSize: '70%', fontStyle: 'italic'}}><sup>*</sup>Marquee does not visually respond to <code>disabled</code> state.</p> : <p />}
		</section>
	);
};

text('marqueeSpacing', _Marquee, Config, '50%');
boolean('disabled', _Marquee, Config);
select('alignment', _Marquee, [null, 'left', 'right', 'center'], Config);
boolean('disabled', _Marquee, Config);
select('forceDirection', _Marquee, [null, 'rtl', 'ltr'], Config);
number('marqueeDelay', _Marquee, Config, 1000);
boolean('marqueeDisabled', _Marquee, Config);
select('marqueeOn', _Marquee, ['hover', 'render'], Config, 'render');
number('marqueeResetDelay', _Marquee, Config, 1000);
number('marqueeSpeed', _Marquee, Config, 60);

_Marquee.storyName = 'Marquee';
_Marquee.parameters = {
	info: {
		text: 'Basic usage of Marquee'
	}
};
