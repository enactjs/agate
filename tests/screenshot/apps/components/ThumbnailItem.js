import ThumbnailItem from '../../../../ThumbnailItem';
import img from '../../images/600x600.png';

import {withConfig} from './utils';

const ThumbnailItemSmokeTests = [
	<ThumbnailItem src={img}>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} selected>Main Content</ThumbnailItem>
];

const ThumbnailItemAdditionalTests = [
	<ThumbnailItem src={img} label="label content">Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} label="label content" disabled>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} label="label content" inline>Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} label="label content" type="styled">Main Content</ThumbnailItem>
];

const ThumbnailItemFocusedSmokeTests = [
	<ThumbnailItem src={img}>Focused Main Content</ThumbnailItem>,
	<ThumbnailItem src={img} selected>Focused Main Content</ThumbnailItem>
];

const ThumbnailItemTests = [
	...ThumbnailItemSmokeTests,
	...ThumbnailItemAdditionalTests,
	...withConfig({focus: true}, ThumbnailItemFocusedSmokeTests)
];

export default ThumbnailItemTests;
