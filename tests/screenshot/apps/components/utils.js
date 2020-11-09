import React from 'react';

const withConfig = (config, tests) => {
	return tests.map(t => {
		if (React.isValidElement(t)) {
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
