const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Gallium Night',
	Page: Page,
	skin: 'gallium-night'
});
