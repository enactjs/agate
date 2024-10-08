/**
 * Provides agate styled Image component that supports multiple resolution sources.
 *
 * @example
 * <Image src="https://dummyimage.com/64/e048e0/0011ff" style={{height: 64, width: 64}} />
 *
 * @module agate/Image
 * @exports Image
 * @exports ImageBase
 * @exports ImageDecorator
 */

import kind from '@enact/core/kind';
import hoc from '@enact/core/hoc';
import UiImage from '@enact/ui/Image';
import Pure from '@enact/ui/internal/Pure';
import {selectSrc} from '@enact/ui/resolution';
import PropTypes from 'prop-types';
import compose from 'ramda/src/compose';
import {Component} from 'react';

import Skinnable from '../Skinnable';

import componentCss from './Image.module.less';

const placeholder =
	'data:image/svg+xml;charset=utf-8;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC' +
	'9zdmciPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIHN0cm9rZT0iIzU1NSIgZmlsbD0iI2FhYSIg' +
	'ZmlsbC1vcGFjaXR5PSIwLjIiIHN0cm9rZS1vcGFjaXR5PSIwLjgiIHN0cm9rZS13aWR0aD0iNiIgLz48L3N2Zz' +
	'4NCg==';

/**
 * An Agate-styled image component without any behavior
 *
 * @class ImageBase
 * @memberof agate/Image
 * @extends ui/Image.Image
 * @ui
 * @public
 */
const ImageBase = kind({
	name: 'Image',

	propTypes: /** @lends agate/Image.ImageBase.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `image` - The root component class for Image
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * String value or Object of values used to determine which image will appear on
		 * a specific screenSize.
		 *
		 * @type {String|Object}
		 * @public
		 */
		src: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
	},

	computed: {
		placeholder: ({src}) => (!src ? placeholder : null)
	},

	styles: {
		css: componentCss,
		publicClassNames: ['image']
	},

	render: ({css, ...rest}) => {
		return (
			<UiImage
				draggable="false"
				{...rest}
				css={css}
			/>
		);
	}
});


// This induces a render when there is a screen size change that has a corresponding image src value
// associated with the new screen size. The render is kicked off by remembering the new image src.
//
// This hoc could (should) be rewritten at a later time to use a smarter context API and callbacks,
// or something like pub/sub; each of which would be hooked together from the resolution.js that
// would coordinate any screen size/orientation changes and emit events from there.
//
// This is ripe for refactoring, and could probably move into UI to be generalized, but that's for
// another time. -B 2018-05-01
const ResponsiveImageDecorator = hoc((config, Wrapped) => {
	return class extends Component {
		static displayName = 'ResponsiveImageDecorator';

		static propTypes = {
			src: PropTypes.oneOfType([PropTypes.string, PropTypes.object])
		};

		constructor (props) {
			super(props);
			this.state = {
				src: selectSrc(this.props.src)
			};
		}

		componentDidMount () {
			window.addEventListener('resize', this.handleResize);
		}

		componentWillUnmount () {
			window.removeEventListener('resize', this.handleResize);
		}

		handleResize = () => {
			this.setState((state, props) => {
				const src = selectSrc(props.src);
				// Trigger a render and save the currently selected src for later comparisons
				if (src !== state.src) {
					return {src};
				}

				return null;
			});
		};

		render () {
			return <Wrapped {...this.props} />;
		}
	};
});

/**
 * agate-specific behaviors to apply to {@link agate/Image.ImageBase|Image}.
 *
 * @hoc
 * @memberof agate/Image
 * @mixes agate/Skinnable.Skinnable
 * @public
 */
const ImageDecorator = compose(
	Pure,
	ResponsiveImageDecorator,
	Skinnable
);

/**
 * An Agate-styled image component
 *
 * Usage:
 * ```
 * <Image
 *   src={{
 *     'hd': 'https://dummyimage.com/64/e048e0/0011ff',
 *     'fhd': 'https://dummyimage.com/128/e048e0/0011ff',
 *     'uhd': 'https://dummyimage.com/256/e048e0/0011ff'
 *   }}
 * >
 * ```
 *
 * @class Image
 * @memberof agate/Image
 * @extends agate/Image.ImageBase
 * @mixes agate/Image.ImageDecorator
 * @ui
 * @public
 */
const Image = ImageDecorator(ImageBase);

export default Image;
export {
	Image,
	ImageBase,
	ImageDecorator
};
