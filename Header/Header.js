/**
 * Agate styled Header.
 *
 * @example
 * <Header title="Profile" titleAbove="Settings" noLine>
 * 	<Button>Close</Button>
 * </Header>
 *
 * @module agate/Header
 * @exports HeaderBase
 * @exports Header
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {Layout, Cell} from '@enact/ui/Layout';
import Slottable from '@enact/ui/Slottable';

import Skinnable from '../Skinnable';

import componentCss from './Header.module.less';

/**
 * A header component for a Panel with a `title`, `titleAbove`, `subtitle`
 *
 * @class Header
 * @memberof agate/Header
 * @ui
 * @public
 */
const HeaderBase = kind({
	name: 'Header',

	propTypes: /** @lends agate/Header.Header.prototype */ {
		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `header` - The root class name
		 * * `titleContainer` - The background title container
		 * * `subtitle` - Applied to `subtitle`
		 * * `title` - Applied to `title`
		 * * `titleAbove` - Applied to `titleAbove`
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * Hides the horizontal-rule (line) under the component
		 *
		 * @type {Boolean}
		 * @public
		 */
		hideLine: PropTypes.bool,

		/**
		 * Text displayed below the title.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * @type {String}
		 */
		subtitle: PropTypes.string,

		/**
		 * Title of the header.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * Example:
		 * ```
		 *  <Header>
		 *  	<title>Example Header Title</title>
		 *  	<subtitle>The Adventure Continues</subtitle>
		 *  </Header>
		 * ```
		 *
		 * @type {String}
		 */
		title: PropTypes.string,

		/**
		 * Text displayed above the title.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * @type {String}
		 */
		titleAbove: PropTypes.string
	},

	styles: {
		css: componentCss,
		className: 'header',
		publicClassNames: true
	},

	computed: {
		className: ({hideLine, styler}) => styler.append({hideLine, standard: true}),
		subtitleComponent: ({css, subtitle}) => {
			return <h2 className={css.subtitle}>{(subtitle != null && subtitle !== '') ? subtitle : ' '}</h2>;
		},
		titleAboveComponent: ({css, titleAbove}) => {
			return <h2 className={css.titleAbove}>{(titleAbove != null && titleAbove !== '') ? titleAbove : ' '}</h2>;
		}
	},

	render: ({children, css, title, titleAboveComponent, subtitleComponent, ...rest}) => {
		delete rest.hideLine;
		delete rest.subtitle;
		delete rest.titleAbove;

		return (
			<header aria-label={title} {...rest}>
				<Layout>
					<Cell className={css.titleContainer}>
						{titleAboveComponent}
						<h1 className={css.title}>{title}</h1>
						{subtitleComponent}
					</Cell>
					{children ? <Cell shrink>{children}</Cell> : null}
				</Layout>
			</header>
		);
	}
});

// Note that we only export this (even as HeaderBase). HeaderBase is not useful on its own.
const Header = Slottable({slots: ['subtitle', 'title', 'titleAbove']}, Skinnable(HeaderBase));

// Set up Header so when it's used in a slottable layout (like Panel), it is automatically
// recognized as this specific slot.
Header.defaultSlot = 'header';

export default Header;
export {Header, HeaderBase};
