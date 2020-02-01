const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Cobalt Day',
	Page: Page,
	skin: 'cobalt-day'
});
