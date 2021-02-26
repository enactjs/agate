import {I18nContextDecorator} from '@enact/i18n/I18nDecorator';
import Item from '@enact/agate/Item';
import Scroller from '@enact/agate/Scroller';
import ThemeDecorator from '@enact/agate/ThemeDecorator';
import Spotlight from '@enact/spotlight';
import SpotlightContainerDecorator from '@enact/spotlight/SpotlightContainerDecorator';
import Layout, {Cell} from '@enact/ui/Layout';
import ViewManager from '@enact/ui/ViewManager';
import compose from 'ramda/src/compose';
import PropTypes from 'prop-types';
import {Component} from 'react';
import classnames from 'classnames';

import ArcPicker from '../views/ArcPicker';
import ArcSlider from '../views/ArcSlider';
import BodyText from '../views/BodyText';
import Button from '../views/Button';
import CheckboxItem from '../views/CheckboxItem';
import ColorPicker from '../views/ColorPicker';
import ContextualPopupDecorator from '../views/ContextualPopupDecorator';
import DatePicker from '../views/DatePicker';
import DateTimePicker from '../views/DateTimePicker';
import Drawer from '../views/Drawer';
import Dropdown from '../views/Dropdown';
import FanSpeedControl from '../views/FanSpeedControl';
import FullscreenPopup from '../views/FullscreenPopup';
import Header from '../views/Header';
import Heading from '../views/Heading';
import ImageItem from '../views/ImageItem';
import IncrementSlider from '../views/IncrementSlider';
import Input from '../views/Input';
import ItemView from '../views/Item';
import Keypad from '../views/Keypad';
import LabeledIconButton from '../views/LabeledIconButton';
import MediaPlayer from '../views/MediaPlayer';
import Option from '../views/Option';
import Panels from '../views/Panels';
import Picker from '../views/Picker';
import Popup from '../views/Popup';
import PopupMenu from '../views/PopupMenu';
import ProgressBar from '../views/ProgressBar';
import RadioItem from '../views/RadioItem';
import RangePicker from '../views/RangePicker';
import ReadAlert from '../views/ReadAlert';
import ScrollerView from '../views/Scroller';
import Slider from '../views/Slider';
import SliderButton from '../views/SliderButton';
import Spinner from '../views/Spinner';
import SwitchItem from '../views/SwitchItem';
import TabbedPanelsView from '../views/TabbedPanels';
import TabGroup from '../views/TabGroup';
import TemperatureControl from '../views/TemperatureControl';
import ThumbnailItem from '../views/ThumbnailItem';
import TimePicker from '../views/TimePicker';
import ToggleButton from '../views/ToggleButton';
import TooltipDecorator from '../views/TooltipDecorator';
import VirtualGridList from '../views/VirtualGridList';
import VirtualList from '../views/VirtualList';
import WindDirectionControl from '../views/WindDirectionControl';

import appCss from './App.module.less';
import Home from './Home';
import View from './View';

const Menu = SpotlightContainerDecorator({enterTo: 'last-focused'}, 'div');

const views = [
	{title: 'About qa-a11y', view: Home},
	{debugProps: true, title: 'Option', view: Option},
	{title: 'ArcPicker', view: ArcPicker},
	{title: 'ArcSlider', view: ArcSlider},
	{title: 'Button', view: Button},
	{title: 'BodyText', view: BodyText},
	{title: 'CheckboxItem', view: CheckboxItem},
	{title: 'ColorPicker', view: ColorPicker},
	{title: 'ContextualPopupDecorator', view: ContextualPopupDecorator},
	{title: 'DatePicker', view: DatePicker},
	{title: 'DateTimePicker', view: DateTimePicker},
	{title: 'Drawer', view: Drawer},
	{title: 'Dropdown', view: Dropdown},
	{title: 'FanSpeedControl', view: FanSpeedControl},
	{title: 'FullscreenPopup', view: FullscreenPopup},
	{isHeader: false, title: 'Header', view: Header},
	{title: 'Heading', view: Heading},
	{title: 'ImageItem', view: ImageItem},
	{title: 'IncrementSlider', view: IncrementSlider},
	{title: 'Input', view: Input},
	{title: 'Item', view: ItemView},
	{title: 'Keypad', view: Keypad},
	{title: 'LabeledIconButton', view: LabeledIconButton},
	{title: 'MediaPlayer', view: MediaPlayer},
	{isHeader: false, title: 'Panels', view: Panels},
	{title: 'Picker', view: Picker},
	{title: 'Popup', view: Popup},
	{title: 'PopupMenu', view: PopupMenu},
	{title: 'ProgressBar', view: ProgressBar},
	{title: 'RadioItem', view: RadioItem},
	{title: 'RangePicker', view: RangePicker},
	{title: 'ReadAlert', view: ReadAlert},
	{isHeader: false, title: 'Scroller', view: ScrollerView},
	{title: 'Slider', view: Slider},
	{title: 'SliderButton', view: SliderButton},
	{title: 'Spinner', view: Spinner},
	{title: 'SwitchItem', view: SwitchItem},
	{isHeader: false, title: 'TabbedPanels', view: TabbedPanelsView},
	{title: 'TabGroup', view: TabGroup},
	{title: 'TemperatureControl', view: TemperatureControl},
	{title: 'ThumbnailItem', view: ThumbnailItem},
	{title: 'TimePicker', view: TimePicker},
	{title: 'ToggleButton', view: ToggleButton},
	{title: 'TooltipDecorator', view: TooltipDecorator},
	{isHeader: false, title: 'VirtualGridList', view: VirtualGridList},
	{isHeader: false, title: 'VirtualList', view: VirtualList},
	{title: 'WindDirectionControl', view: WindDirectionControl}
];

class AppBase extends Component {
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
		const menu = views.map((view, i) => (
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
		));

		delete rest.rtl;
		delete rest.updateLocale;

		return (
			<div className={classnames(className, debugAriaClass, appCss.app)}>
				<Layout {...rest} className={appCss.layout}>
					<Cell component={Menu} id="menu" size="20%" spotlightId="menu">
						<div className={appCss.jumpToView}>Jump To View: {jumpToView}</div>
						<Scroller className={appCss.scroller}>
							{menu}
						</Scroller>
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
