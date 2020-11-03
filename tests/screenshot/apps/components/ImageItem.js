import ImageItem from '../../../../ImageItem';
import ri from '@enact/ui/resolution';
import React from 'react';

const ImageItemTests = [
	<div style={{width: '100%', height: '100%'}}>
		<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
			<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0">caption</ImageItem>
		</div>
	</div>,
	<div style={{width: '100%', height: '100%'}}>
		<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
			<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0">caption</ImageItem>
		</div>
	</div>,
	<div style={{width: '100%', height: '100%'}}>
		<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
			<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0" orientation="horizontal">caption</ImageItem>
		</div>
	</div>,
	<div style={{width: '100%', height: '100%'}}>
		<div style={{width: ri.scaleToRem(400), height: ri.scaleToRem(300)}}>
			<ImageItem src="http://placehold.it/300x400/9037ab/ffffff&text=Image0" captionPosition="overlay">caption</ImageItem>
		</div>
	</div>
];

export default ImageItemTests;
