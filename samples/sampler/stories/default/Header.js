import {mergeComponentMetadata} from '@enact/storybook-utils';
import {boolean, select, text} from '@enact/storybook-utils/addons/controls';
import {Fragment} from 'react';
import Button from '@enact/agate/Button';
import {Header, HeaderBase} from '@enact/agate/Header';

Header.displayName = 'Header';
const Config = mergeComponentMetadata('Header', HeaderBase, Header);

// Set up some defaults for children controls
const prop = {
	children: {
		'no buttons': null,
		'1 button': <Button icon="home" />,
		'2 buttons': (
			<Fragment>
				<Button>A Button</Button>
				<Button icon="home" />
			</Fragment>
		)
	}
};

export default {
	title: 'Agate/Header',
	component: 'Header'
};

export const _Header = (args) => {
	const childrenSelection = args['children'];
	const children = prop.children[childrenSelection];

	return (
		<Header
			hideLine={args['hideLine']}
			marqueeOn={args['marqueeOn']}
			subtitle={args['subtitle']}
			title={args['title']}
			titleAbove={args['titleAbove']}
		>
			{children}
		</Header>
	);
};

select('children', _Header, ['no buttons', '1 button', '2 buttons'], Config);
boolean('hideLine', _Header, Config);
select('marqueeOn', _Header, ['hover', 'render'], Config);
text('subtitle', _Header, Config, 'Sub Title');
text('title', _Header, Config, 'Main Title');
text('titleAbove', _Header, Config, '');

_Header.storyName = 'Header';
_Header.parameters = {
	info: {
		text: 'A block to use as a screen\'s title and description. Supports additional buttons, subtitle and title above.'
	}
};
