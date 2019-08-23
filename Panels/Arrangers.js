import {scale, unit} from '@enact/ui/resolution';
import {arrange} from '@enact/ui/ViewManager/Arranger';

import {breadcrumbWidth} from './Breadcrumb';

const quadInOut = 'cubic-bezier(0.455, 0.030, 0.515, 0.955)';
const animationOptions = {easing: quadInOut};

// Actvity Arranger

/*
 * Appends a transform that accounts for a single breadcrumb
 *
 * @param  {Node} node      DOM Node
 *
 * @returns {undefined}
 * @private
 */
const offsetForBreadcrumbs = (node) => {
	const isFirst = node && node.dataset && node.dataset.index === '0';

	return `translateX(${isFirst ? 0 : unit(scale(breadcrumbWidth), 'rem')})`;
};

/**
 * Arranger that slides panels in from the right and out to the left allowing space for the single
 * breadcrumb when `to` index is greater than zero.
 *
 * @type {Arranger}
 * @private
 */
const PanelsArranger = {
	enter: (config) => {
		const {node} = config;

		return arrange(config, [
			{transform: `${offsetForBreadcrumbs(node)} translateX(100%)`},
			{transform: offsetForBreadcrumbs(node)}
		], animationOptions);
	},
	leave: (config) => {
		const {node} = config;

		return arrange(config, [
			{transform: offsetForBreadcrumbs(node)},
			{transform: 'translateX(-100%)'}
		], animationOptions);
	},
	stay: (config) => {
		const {node} = config;

		return arrange(config, [
			{transform: offsetForBreadcrumbs(node)},
			{transform: offsetForBreadcrumbs(node)}
		], animationOptions);
	}
};

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

export {
	BreadcrumbArranger,
	PanelsArranger
};
