/**
 * Agate styled Header.
 *
 * @example
 * <Header title="Profile" titleAbove="Settings" noLine>
 * 	<Button>Close</Button>
 * </Header>
 *
 * @module agate/Header
 * @exports Header
 */

import kind from '@enact/core/kind';
import React from 'react';
import PropTypes from 'prop-types';
import {Column, Row, Layout} from '@enact/ui/Layout';
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
		 * Title of the header.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * Example:
		 * ```
		 *  <Header>
		 *  	<titleAbove>Introducing...</titleAbove>
		 *  	<title>Example Header Title</title>
		 *  	<subtitle>The Adventure Continues</subtitle>
		 *  </Header>
		 * ```
		 *
		 * @required
		 * @type {String}
		 */
		title: PropTypes.string.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal elements and states of this component.
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
		 * Subtitle id of the header.
		 *
		 * @type {String}
		 * @private
		 */
		subtitleId: PropTypes.string,

		/**
		 * Text displayed above the title.
		 *
		 * This is a [`slot`]{@link ui/Slottable.Slottable}, so it can be used as a tag-name inside
		 * this component.
		 *
		 * @type {String}
		 */
		titleAbove: PropTypes.string,

		/**
		 * Title id of the header.
		 *
		 * @type {String}
		 * @private
		 */
		titleId: PropTypes.string
	},

	styles: {
		css: componentCss,
		className: 'header',
		publicClassNames: true
	},

	computed: {
		className: ({hideLine, styler}) => styler.append({hideLine, standard: true}),
		subtitleComponent: ({css, subtitle, subtitleId}) => {
			return (subtitle != null && subtitle !== '') ? <h2 className={css.subtitle} id={subtitleId}>{subtitle}</h2> : null;
		},
		titleAboveComponent: ({css, titleAbove}) => {
			return (titleAbove != null && titleAbove !== '') ? <h2 className={css.titleAbove}>{titleAbove}</h2> : null;
		}
	},

	render: ({children, css, title, titleId, titleAboveComponent, subtitleComponent, ...rest}) => {
		delete rest.hideLine;
		delete rest.subtitle;
		delete rest.subtitleId;
		delete rest.titleAbove;
		delete rest.titleId;

		return (
			<Row component="header" aria-label={title} {...rest}>
				<Column className={css.titleContainer}>
					{titleAboveComponent}
					<h1 className={css.title} id={titleId}>{title}</h1>
					{subtitleComponent}
				</Column>
				{children ? <Layout className={css.endSlot}>{children}</Layout> : null}
			</Row>
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
