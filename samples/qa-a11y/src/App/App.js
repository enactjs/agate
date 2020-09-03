import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Item from '@enact/agate/Item';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import ViewManager from '@enact/ui/ViewManager';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import React from 'react';
import classnames from 'classnames';

import Button from '../views/Button';
import CheckboxItem from '../views/CheckboxItem';
import ColorPicker from '../views/ColorPicker';
import ContextualPopupDecorator from '../views/ContextualPopupDecorator';
import DateTimePicker from '../views/DateTimePicker';
import Drawer from '../views/Drawer';
import Dropdown from '../views/Dropdown';
import Header from '../views/Header';
import ImageItem from '../views/ImageItem';
import Input from '../views/Input';
import ItemView from '../views/Item';
import Option from '../views/Option';
import Panels from '../views/Panels';
import Picker from '../views/Picker';
import Popup from '../views/Popup';
import ProgressBar from '../views/ProgressBar';
import RadioItem from '../views/RadioItem';
import RangePicker from '../views/RangePicker';
import ReadAlert from '../views/ReadAlert';
import Scroller from '../views/Scroller';
import Slider from '../views/Slider';
import Spinner from '../views/Spinner';
import SwitchItem from '../views/SwitchItem';
import TooltipDecorator from '../views/TooltipDecorator';
import VirtualGridList from '../views/VirtualGridList';
import VirtualList from '../views/VirtualList';

import appCss from './App.module.less';
import Home from './Home';
import View from './View';

const Menu = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const views = [
	{title: 'About qa-a11y', view: Home},
	{debugProps: true, title: 'Option', view: Option},
	{title: 'Button', view: Button},
	{title: 'CheckboxItem', view: CheckboxItem},
	{title: 'ColorPicker', view: ColorPicker},
	{title: 'ContextualPopupDecorator', view: ContextualPopupDecorator},
	{title: 'DateTimePicker', view: DateTimePicker},
	{title: 'Drawer', view: Drawer},
	{title: 'Dropdown', view: Dropdown},
	{isHeader: false, title: 'Header', view: Header},
	{title: 'ImageItem', view: ImageItem},
	{title: 'Input', view: Input},
	{title: 'Item', view: ItemView},
	{isHeader: false, title: 'Panels', view: Panels},
	{title: 'Picker', view: Picker},
	{title: 'Popup', view: Popup},
	{title: 'ProgressBar', view: ProgressBar},
	{title: 'RadioItem', view: RadioItem},
	{title: 'RangePicker', view: RangePicker},
	{title: 'ReadAlert', view: ReadAlert},
	{isHeader: false, title: 'Scroller', view: Scroller},
	{title: 'Slider', view: Slider},
	{title: 'Spinner', view: Spinner},
	{title: 'SwitchItem', view: SwitchItem},
	{title: 'TooltipDecorator', view: TooltipDecorator},
	{isHeader: false, title: 'VirtualGridList', view: VirtualGridList},
	{isHeader: false, title: 'VirtualList', view: VirtualList}
];

class AppBase extends React.Component {
	static propTypes = {
		rtl: PropTypes.bool,
		updateLocale: PropTypes.func
	};
	constructor () {
		super();
		this.state = {
			isDebugMode: false,
			jumpToView: '',
			selected: 0
		};
	}

	componentDidMount () {
		document.addEventListener('keydown', this.handleKeyDown);
	}

	cachedKey = -1;

	handleChangeView = (selected) => () => this.setState({selected});

	handleDebug = () => this.setState((state) => ({isDebugMode: !state.isDebugMode}));

	handleKeyDown = (ev) => {
		const {keyCode} = ev;
		const {rtl, updateLocale} = this.props;

		if (keyCode === 403 || keyCode === 82) { // Red Key or `r` key
			updateLocale(rtl ? 'en-US' : 'ar-SA');
		} else if (keyCode === 404 || keyCode === 71) { // Green Key or `g` key
			this.handleDebug();
		} else if (keyCode >= 48 && keyCode <= 57) {
			const num = keyCode - 48;

			if (this.cachedKey === -1) {
				this.cachedKey = num;
				this.setState({jumpToView: num});
			} else {
				const selected = this.cachedKey * 10 + num;

				if (selected < views.length) {
					const target = document.querySelector('[data-menu="' + selected + '"]');
					Spotlight.focus(target);
					this.handleChangeView(selected)();
				}

				this.setState({jumpToView: '' + this.cachedKey + num});
				this.cachedKey = -1;
			}
		}
	};

	render () {
		const {className, ...rest} = this.props;
		const {isDebugMode, jumpToView, selected} = this.state;
		const debugAriaClass = isDebugMode ? 'aria debug' : null;

		delete rest.rtl;
		delete rest.updateLocale;

		return (
			<div className={classnames(className, debugAriaClass)}>
				<Layout {...rest} className={appCss.layout}>
					<Cell component={Menu} id="menu" size="20%" spotlightId="menu">
						<div className={appCss.jumpToView}>Jump To View: {jumpToView}</div>
						{views.map((view, i) => (
							<Item
								aria-label={view.title}
								className={appCss.navItem}
								data-menu={i}
								key={i}
								onClick={this.handleChangeView(i)}
								slotBefore={('00' + i).slice(-2)}
							>
								{view.title}
							</Item>
						))}
					</Cell>
					<Cell component={ViewManager} index={selected}>
						{views.map((view, i) => (
							<View {...view} handleDebug={this.handleDebug} isDebugMode={isDebugMode} key={i} />
						))}
					</Cell>
				</Layout>
			</div>
		);
	}
}

const AppDecorator = compose(
	ThemeDecorator,
	I18nContextDecorator({rtlProp: 'rtl', updateLocaleProp: 'updateLocale'})
);

const App = AppDecorator(AppBase);

export default App;
