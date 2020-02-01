const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Copper Day',
	Page: Page,
	skin: 'copper-day'
});
