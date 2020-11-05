import {generateTestData} from '@enact/ui-test-utils/utils';

import ArcPicker from './components/ArcPicker';
import ArcSlider from './components/ArcSlider';
import BodyText from './components/BodyText';
import Button from './components/Button';
import CheckboxItem from './components/CheckboxItem';
import ColorPicker from './components/ColorPicker';
import ContextualPopupDecorator from './components/ContextualPopupDecorator';
import DatePicker from './components/DatePicker';
import DateTimePicker from './components/DateTimePicker';
import Drawer from './components/Drawer';
import Dropdown from './components/Dropdown';
import FanSpeedControl from './components/FanSpeedControl';
import FullscreenPopup from './components/FullscreenPopup';
import Header from './components/Header';
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
import MediaPlayer from './components/MediaPlayer';
import Panels from './components/Panels';
import Picker from './components/Picker';
import Popup from './components/Popup';
import PopupMenu from './components/PopupMenu';
import ProgressBar from './components/ProgressBar';
import RadioItem from './components/RadioItem';
import RangePicker from './components/RangePicker';
import Scroller from './components/Scroller';
import Slider from './components/Slider';
import SliderButton from './components/SliderButton';
import Spinner from './components/Spinner';
import SwitchItem from './components/SwitchItem';
import TabGroup from './components/TabGroup';
import TemperatureControl from './components/TemperatureControl';
import TimePicker from './components/TimePicker';
import ThumbnailItem from './components/ThumbnailItem';
import ToggleButton from './components/ToggleButton';
import TooltipDecorator from './components/TooltipDecorator';
import VirtualList from './components/VirtualList';
import WindDirectionControl from './components/WindDirectionControl';

const agateComponents = {
	ArcPicker,
	ArcSlider,
	BodyText,
	Button,
	CheckboxItem,
	ColorPicker,
	ContextualPopupDecorator,
	DatePicker,
	DateTimePicker,
	Drawer,
	Dropdown,
	FanSpeedControl,
	FullscreenPopup,
	Header,
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
	MediaPlayer,
	Panels,
	Picker,
	Popup,
	PopupMenu,
	ProgressBar,
	RadioItem,
	RangePicker,
	Scroller,
	Slider,
	SliderButton,
	Spinner,
	SwitchItem,
	TabGroup,
	TimePicker,
	ToggleButton,
	TooltipDecorator,
	TemperatureControl,
	ThumbnailItem,
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
