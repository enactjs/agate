import {generateTestData} from '@enact/ui-test-utils/utils';

import ArcPicker from './components/ArcPicker';
import ArcSlider from './components/ArcSlider';
import Button from './components/Button';
import ContextualPopupDecorator from './components/ContextualPopupDecorator';
import CheckboxItem from './components/CheckboxItem';
import DateTimePicker from './components/DateTimePicker';
import Drawer from './components/Drawer';
import Dropdown from './components/Dropdown';
import FullscreenPopup from './components/FullscreenPopup';
import Header from './components/Header';
import FanSpeedControl from './components/FanSpeedControl';
import Heading from './components/Heading';
import Icon from './components/Icon';
import Image from './components/Image';
import ImageItem from './components/ImageItem';
import IncrementSlider from './components/IncrementSlider';
import Input from './components/Input';
import Item from './components/Item';
import Keypad from './components/Keypad';
import LabeledIcon from './components/LabeledIcon';
import LabeledIconButton from './components/LabeledIconButton';
import Panels from './components/Panels';
import ProgressBar from './components/ProgressBar';
import Popup from './components/Popup';
import PopupMenu from './components/PopupMenu';
import Picker from './components/Picker';
import RadioItem from './components/RadioItem';
import Scroller from './components/Scroller';
import Slider from './components/Slider';
import Spinner from './components/Spinner';
import SwitchItem from './components/SwitchItem';
import TabGroup from './components/TabGroup';
import TemperatureControl from './components/TemperatureControl';
import ThumbnailItem from './components/ThumbnailItem';
import ToggleButton from './components/ToggleButton';
import TooltipDecorator from './components/TooltipDecorator';
import VirtualList from './components/VirtualList';
import WindDirectionControl from './components/WindDirectionControl';

const agateComponents = {
	ArcPicker,
	ArcSlider,
	Button,
	ContextualPopupDecorator,
	CheckboxItem,
	DateTimePicker,
	Drawer,
	Dropdown,
	FullscreenPopup,
	Header,
	FanSpeedControl,
	Heading,
	Icon,
	Image,
	ImageItem,
	IncrementSlider,
	Input,
	Item,
	Keypad,
	LabeledIcon,
	LabeledIconButton,
	Panels,
	ProgressBar,
	Popup,
	PopupMenu,
	Picker,
	RadioItem,
	Scroller,
	Slider,
	Spinner,
	SwitchItem,
	TabGroup,
	ToggleButton,
	TooltipDecorator
	TemperatureControl,
	ThumbnailItem,
	ToggleButton,
	VirtualList,
	WindDirectionControl
};

const agateTestMetadata = {};


Object.keys(agateComponents).forEach((component) => {
	let metaData = generateTestData(component, agateComponents[component]);
	agateTestMetadata[component] = metaData;
});

export default agateComponents;
export {agateComponents, agateTestMetadata};
