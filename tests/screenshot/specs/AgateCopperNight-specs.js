const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Copper Night',
	Page: Page,
	skin: 'copper',
	skinVariants: '"night"'
});
