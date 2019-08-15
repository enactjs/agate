import hoc from '@enact/core/hoc';
import Cancelable from '@enact/ui/Cancelable';
import Spotlight from '@enact/spotlight';

const defaultConfig = {
	cancel: null
};

const CancelDecorator = hoc(defaultConfig, (config, Wrapped) => {
	const {cancel} = config;

	function handleCancel (ev, props) {
		const {index, [cancel]: handler, path} = props;
		const event = {};

		if (index > 0 || (path && path.length > 1) && handler) {
			// clear Spotlight focus
			const current = Spotlight.getCurrent();
			if (current) {
				current.blur();
			}

			if (path) {
				// this is a RoutablePanels
				path.pop();
				event.path = path;
			} else {
				// this is a Panels
				event.index = index - 1;
			}

			handler(event);

			ev.stopPropagation();
		}
	}

	return Cancelable(
		{modal: true, onCancel: handleCancel},
		Wrapped
	);
});

export default CancelDecorator;
export {CancelDecorator};
