import ri from '@enact/ui/resolution';
import React from 'react';
import ImageItem from '../../../../ImageItem';

import img from '../../images/600x600.png';

const style = {width: ri.scaleToRem(400), height: ri.scaleToRem(300)};

const ImageItemTests = [
	<div style={{height: '100%'}}>
		<div style={style}>
			<ImageItem src={img}>caption</ImageItem>
		</div>
	</div>,
	<div style={{height: '100%'}}>
		<div style={style}>
			<ImageItem src={img}>caption</ImageItem>
		</div>
	</div>,
	<div style={{height: '100%'}}>
		<div style={style}>
			<ImageItem src={img} orientation="horizontal">caption</ImageItem>
		</div>
	</div>,
	<div style={{height: '100%'}}>
		<div style={style}>
			<ImageItem src={img} captionPosition="overlay">caption</ImageItem>
		</div>
	</div>
];

export default ImageItemTests;
