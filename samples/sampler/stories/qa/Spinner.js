import kind from '@enact/core/kind';
import {boolean, select, text} from '@enact/storybook-utils/addons/knobs';
import ri from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import React from 'react';
import {storiesOf} from '@storybook/react';

import Spinner from '@enact/agate/Spinner';
import Skinnable from '@enact/agate/Skinnable';

Spinner.displayName = 'Spinner';

// Set up some defaults for info and knobs
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

storiesOf('Spinner', module)
	.add(
		'with long content',
		() => (
			<div>
				<div
					style={{
						height: ri.scaleToRem(300),
						border: ri.scaleToRem(2) + ' dotted red'
					}}
				>
					<SkinnedSpinner
						blockClickOn={select('blockClickOn', [null, 'container', 'screen'], Spinner)}
						centered={boolean('centered', Spinner, false)}
						scrim={boolean('scrim', Spinner, true)}
						transparent={boolean('transparent', Spinner, false)}
					>
						{text('content', Spinner, prop.longText)}
					</SkinnedSpinner>
				</div>
			</div>
		)
	);
