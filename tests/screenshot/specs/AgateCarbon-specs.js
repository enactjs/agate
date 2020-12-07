const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Carbon',
	Page: Page,
	skin: 'carbon'
});
