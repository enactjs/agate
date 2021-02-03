const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Silicon',
	Page: Page,
	skin: 'silicon'
});
