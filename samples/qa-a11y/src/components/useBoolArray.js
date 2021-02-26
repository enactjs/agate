import {useState} from 'react';

const useBoolArray = (num) => {
	const [bools, setBool] = useState(() => (new Array(num)).fill(false));

	const handler = (index, bool) => () => setBool([
		...bools.slice(0, index),
		bool,
		...bools.slice(index + 1)
	]);

	return [bools, handler];
};

export default useBoolArray;
export {
	useBoolArray
};
