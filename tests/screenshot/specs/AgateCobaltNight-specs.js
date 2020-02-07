const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Cobalt Night',
	Page: Page,
	skin: 'cobalt',
	skinVariants: '"night"'
});
