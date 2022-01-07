// Agate Environment

import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import {Row, Column, Cell} from '@enact/ui/Layout';

import Heading from '@enact/agate/Heading';
import {Panels, Panel} from '@enact/agate/Panels';
import Scroller from '@enact/agate/Scroller';
import Skinnable from '@enact/agate/Skinnable';
import ThemeDecorator from '@enact/agate/ThemeDecorator';

import css from './ThemeEnvironment.module.less';

const reloadPage = () => {
	const {protocol, host, pathname} = window.parent.location;
	window.parent.location.href = protocol + '//' + host + pathname;
};

const SkinFrame = Skinnable(
	kind({
		name: 'SkinFrame',

		propTypes: {
			/**
       * Hides the Panel's body components.
       *
       * @type {Boolean}
       * @public
       */
			hideChildren: PropTypes.bool,

			/**
       * Spotlight Id.
       *
       * @type {String}
       * @private
       */
			spotlightId: PropTypes.string
		},

		styles: {
			css,
			className: 'skinFrame'
		},

		render: (props) => {
			delete props.hideChildren;
			delete props.spotlightId;

			return <Row {...props} />;
		}
	})
);

const PanelsBase = kind({
	name: 'ThemeEnvironment',

	propTypes: {
		description: PropTypes.string,
		noScroller: PropTypes.bool,
		noPanel: PropTypes.bool, // eslint-disable-line react/sort-prop-types
		noPanels: PropTypes.bool, // eslint-disable-line react/sort-prop-types
		spotlightId: PropTypes.string,
		title: PropTypes.string
	},

	styles: {
		css,
		className: 'themeEnvironment'
	},

	render: ({
		children,
		description,
		noScroller,
		noPanel,
		noPanels,
		title,
		...rest
	}) => {
		const Wrapper = noScroller ? 'div' : Scroller;

		delete rest.spotlightId;

		return !noPanels ? (
			<Wrapper {...rest}>
				<Panels onApplicationClose={reloadPage}>
					{!noPanel ? (
						<Panel className={css.panel}>
							<Column>
								<Cell shrink>
									<Heading showLine>{title}</Heading>
									{description ? (
										<div className={css.description}>
											<p>{description}</p>
										</div>
									) : null}
								</Cell>
								<Cell className={css.storyBody}>{children}</Cell>
							</Column>
						</Panel>
					) : (
						children
					)}
				</Panels>
			</Wrapper>
		) : (
			<Wrapper {...rest}>{children}</Wrapper>
		);
	}
});


const Theme = ThemeDecorator({overlay: false}, PanelsBase);

const skins = {
	'Carbon': 'carbon',
	'Cobalt': 'cobalt',
	'Copper': 'copper',
	'Electro': 'electro',
	'Gallium': 'gallium',
	'Titanium': 'titanium'
};

const defaultColors = {
	carbon: {
		accent: '#8fd43a',
		highlight: '#6abe0b'
	},
	cobalt: {
		accent: '#8c81ff',
		highlight: '#ffffff'
	},
	copper: {
		accent: '#a47d66',
		highlight: '#ffffff'
	},
	electro: {
		accent: '#0359f0',
		highlight: '#ff8100'
	},
	gallium: {
		accent: '#8b7efe',
		highlight: '#e16253'
	},
	silicon: {
		accent: '#f1304f',
		highlight: '#9e00d8'
	},
	titanium: {
		accent: '#a6a6a6',
		highlight: '#2a48ca'
	}
};

const StorybookDecorator = (story, config) => {
	const sample = story();

	// TODO: get knobs from url, as it was done previosly
	// const skinFromURL = getPropFromURL('skin');
	// const accentFromURL = getPropFromURL('accent');
	// const highlightFromURL = getPropFromURL('highlight');
	// const localeFromURL = getPropFromURL('locale');

	let {globals} = config;
	const showAllSkins = JSON.parse(globals['show all skins']);
	const componentName = config.kind.replace(/^([^/]+)\//, '');

	// NOTE: 'config' object is not extensible
	const hasInfoText = config.parameters && config.parameters.info && config.parameters.info.text;
	const hasProps = config.parameters && config.parameters.props;

	return (
		<Theme
			title={componentName === config.name ? `${config.kind}`.replace(/\//g, ' ').trim() : `${componentName} ${config.name}`}
			description={hasInfoText ? config.parameters.info.text : null}
			locale={globals.locale}
			skin={showAllSkins ? skins['Gallium'] : globals.skin}
			skinVariants={JSON.parse(globals['night mode']) ? 'night' : null}
			// accent={defaultColors[globals['skin']].accent}
			// highlight={defaultColors[globals['skin']].highlight}
			{...(hasProps ? config.parameters.props : null)}
		>
			{
				// showAllSkins ?
				// Object.keys(skins).map((skin) => (
				// 	<SkinFrame skin={skins[skin]} key={skin}>
				// 		<Cell size="20%" component={Heading}>
				// 			{skin}
				// 		</Cell>
				// 		<Cell>{sample}</Cell>
				// 	</SkinFrame>
				// )) :
				sample
			}
		</Theme>
	);
};


export default StorybookDecorator;
export {StorybookDecorator as Theme};
