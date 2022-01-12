import kind from '@enact/core/kind';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import Spinner from '@enact/agate/Spinner';
import Skinnable from '@enact/agate/Skinnable';

Spinner.displayName = 'Spinner';

// Set up some defaults for info and controls
const
	prop = {
		longText:'SpinnerWithLongText SpinnerWithLongText SpinnerWithLongText'
	};

const SkinnedSpinnerBase = kind({
	name: 'SkinSpinner',

	propTypes: {
		skinVariants: PropTypes.object
	},

	render: ({skinVariants, ...rest}) => {
		return <Spinner {...rest} color={skinVariants.night ? 'light' : 'dark'} />;
	}
});

const SkinnedSpinner = Skinnable({variantsProp: 'skinVariants'}, SkinnedSpinnerBase);

export default {
	title: 'Agate/Spinner',
	component: 'Spinner'
};

export const WithLongContent = (args) => (
	<div>
		<div
			style={{
				height: ri.scaleToRem(300),
				border: ri.scaleToRem(2) + ' dotted red'
			}}
		>
			<SkinnedSpinner
				blockClickOn={args['blockClickOn']}
				centered={args['centered']}
				scrim={args['scrim']}
				transparent={args['transparent']}
			>
				{args['content']}
			</SkinnedSpinner>
		</div>
	</div>
);
select('blockClickOn', WithLongContent, [null, 'container', 'screen'], Spinner);
boolean('centered', WithLongContent, Spinner, false);
boolean('scrim', WithLongContent, Spinner, true);
boolean('transparent', WithLongContent, Spinner, false);
text('content', WithLongContent, Spinner, prop.longText);
WithLongContent.storyName = 'with long content';
