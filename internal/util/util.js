import equals from 'ramda/src/equals';

/**
 * Compares two children and returns true if they are equivalent, false otherwise.
 *
 * @function
 * @param   {children}    a    children props
*  @param   {children}    b    children props
 *
 * @returns {Boolean}          `true` if same
 * @memberof agate/internal/util
 * @private
 */
const compareChildren = (a, b) => {
	if (!a || !b || a.length !== b.length) return false;

	let type = null;
	for (let i = 0; i < a.length; i++) {
		type = type || typeof a[i];
		if (type === 'string') {
			if (a[i] !== b[i]) {
				return false;
			}
		} else if (!equals(a[i], b[i])) {
			return false;
		}
	}

	return true;
};

export {
	compareChildren
};
