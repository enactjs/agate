/**
 * Applies Agate specific styling and behaviors.
 *
 * @module agate/AgateDecorator
 * @exports AgateDecorator
 * @deprecated Will be removed in 2.0.0. Use {@link agate/ThemeDecorator} instead.
 */

import deprecate from '@enact/core/internal/deprecate';
import ThemeDecorator from '@enact/agate/ThemeDecorator';

const AgateDecorator = deprecate(ThemeDecorator, {
	name: 'agate/AgateDecorator',
	replacedBy: 'agate/ThemeDecorator',
	until: '2.0.0'
});

export default AgateDecorator;
export {AgateDecorator};
