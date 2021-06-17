import kind from '@enact/core/kind';
import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, number, select, text} from '@enact/storybook-utils/addons/knobs';
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

export const _Marquee = () => {
	const value = text('marqueeSpacing', Config, '50%');
	const spacing = () => {
		if (value && value.indexOf('%') > 0) {
			return value;
		}

		return Number.parseInt(value);
	};
	const disabled = boolean('disabled', Config);

	return (
		<section>
			<I18nMarquee
				alignment={select('alignment', [null, 'left', 'right', 'center'], Config)}
				disabled={boolean('disabled', Config)}
				forceDirection={select('forceDirection', [null, 'rtl', 'ltr'], Config)}
				marqueeDelay={number('marqueeDelay', Config, 1000)}
				marqueeDisabled={boolean('marqueeDisabled', Config)}
				marqueeOn={select('marqueeOn', ['hover', 'render'], Config, 'render')}
				marqueeOnRenderDelay={1000}
				marqueeResetDelay={number('marqueeResetDelay', Config, 1000)}
				marqueeSpacing={spacing(text('marqueeSpacing', Config, '50%'))}
				marqueeSpeed={number('marqueeSpeed', Config, 60)}
				style={{width: '600px'}}
			/>
			{disabled ? <p style={{fontSize: '70%', fontStyle: 'italic'}}><sup>*</sup>Marquee does not visually respond to <code>disabled</code> state.</p> : <p />}
		</section>
	);
};

_Marquee.storyName = 'Marquee';
_Marquee.parameters = {
	info: {
		text: 'Basic usage of Marquee'
	}
};
