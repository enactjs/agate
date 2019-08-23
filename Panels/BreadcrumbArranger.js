import {arrange} from '@enact/ui/ViewManager/Arranger';

/**
 * Positions a breadcrumb based on its `data-index` and the current index, `to`
 *
 * @param  {Object} config  Arrangement configuration object
 * @returns {undefined}
 * @method
 * @private
 */
const positionBreadcrumb = (node, index) => {
	const crumbIndex = node.dataset.index;
	const x = (index - crumbIndex);
	const percentX = x * -100;

	return `translateX(${percentX}%)`;
};

const enter = (config) => {
	const {node, from, to, reverse} = config;
	const keyframes = reverse ? [
		{transform: positionBreadcrumb(node, to)},
		{transform: positionBreadcrumb(node, from)}
	] : [
		{transform: positionBreadcrumb(node, from)},
		{transform: positionBreadcrumb(node, to)}
	];

	return arrange(config, keyframes, {easing: 'cubic-bezier(0.455, 0.030, 0.515, 0.955)'});
};

/**
 * Arranger for panel breadcrumbs
 *
 * @type {Arranger}
 * @private
 */
const BreadcrumbArranger = {
	enter: enter,
	stay: enter,
	leave: enter
};

export default BreadcrumbArranger;
export {BreadcrumbArranger};
