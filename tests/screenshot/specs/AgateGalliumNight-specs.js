// const {runTest} = require('@enact/ui-test-utils/utils');
// const Page = require('./AgatePage');

import {runTest} from '@enact/ui-test-utils/utils/index.js';
import Page from './AgatePage.js'

runTest({
	testName: 'Agate Gallium Night',
	Page: Page,
	skin: 'gallium',
	skinVariants: '"night"'
});
