const {runTest} = require('@enact/ui-test-utils/utils');
const Page = require('./AgatePage');

runTest({
	testName: 'Agate Electro',
	Page: Page,
	skin: 'electro'
});
