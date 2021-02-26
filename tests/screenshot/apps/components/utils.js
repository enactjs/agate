import {isValidElement} from 'react';

const withConfig = (config, tests) => {
	return tests.map(t => {
		if (isValidElement(t)) {
			return {
				...config,
				component: t
			};
		}

		return {
			...t,
			...config
		};
	});
};

export {
	withConfig
};
