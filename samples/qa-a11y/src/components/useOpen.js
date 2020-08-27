import React from 'react';

const useOpen = (num) => {
	const [open, setOpen] = React.useState(() => {
		const array = new Array(num);
		array.fill(false);
		return array;
	});

	const updateOpen = (index, state) => () => {
		const a = [
			...open.slice(0, index),
			state,
			...open.slice(index + 1)
		];

		setOpen(a);
	};

	return [open, updateOpen];
};

export default useOpen;
export {
	useOpen
};
