// module.exports = require('@enact/ui-test-utils/ui/wdio.conf.js'); ORIGINAL IMPORT OF CONFIG OBJECT

module.exports.config = import('@enact/ui-test-utils/ui/wdio.conf.js');
module.exports = config;

const loadConfig = async () => {
	const config = await import('@enact/ui-test-utils/ui/wdio.conf.js');
	module.exports = config;
};
loadConfig();

let configObject;
const loadConfig = async () => {
	configObject = await import('@enact/ui-test-utils/ui/wdio.conf.js');
	return configObject;
}
module.exports = loadConfig();

(async () => {
	const config = await import('@enact/ui-test-utils/ui/wdio.conf.js');
	module.exports = config;
})();

const logConfig = async () => {
	const config = await import('@enact/ui-test-utils/ui/wdio.conf.js');
	console.log(config);
}
logConfig();
