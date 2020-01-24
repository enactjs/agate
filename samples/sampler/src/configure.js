import {configure, addDecorator} from '@storybook/react';
import {loadStories} from '@enact/storybook-utils';
import {configureActions} from '@enact/storybook-utils/addons/actions';
import {withKnobs} from '@enact/storybook-utils/addons/knobs';

import Agate from '../src/AgateEnvironment';

function config (stories, mod) {
	configureActions();
	addDecorator(withKnobs());

	// Set agate environment defaults
	addDecorator(Agate);

	configure(loadStories(stories), mod);
}

export default config;
