/**
 * {@link agate/AgateDecorator} will be removed in 2.0.0. Use {@link agate/ThemeDecorator} instead.
 *
 * @module agate/AgateDecorator
 * @exports AgateDecorator
 * @deprecated
 */

import deprecate from '@enact/core/internal/deprecate';
import ThemeDecorator from '../ThemeDecorator';

const AgateDecorator = deprecate(ThemeDecorator, {
	name: 'agate/AgateDecorator',
	replacedBy: 'agate/ThemeDecorator',
	until: '2.0.0'
});

export default AgateDecorator;
export {AgateDecorator};
