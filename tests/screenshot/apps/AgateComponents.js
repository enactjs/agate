import {generateTestData} from '@enact/ui-test-utils/utils';

import ArcPicker from "./components/ArcPicker";
import ArcSlider from "./components/ArcSlider";
import Button from './components/Button';
import CheckboxItem from './components/CheckboxItem';
import DateTimePicker from './components/DateTimePicker';
import FanSpeedControl from './components/FanSpeedControl';
import Heading from './components/Heading';
import ImageItem from './components/ImageItem';
import IncrementSlider from './components/IncrementSlider';
import Input from './components/Input';
import Icon from './components/Icon';
import Item from './components/Item';
import LabeledIcon from './components/LabeledIcon';
import LabeledIconButton from './components/LabeledIconButton';
import ProgressBar from './components/ProgressBar';
import Popup from './components/Popup';
import Picker from './components/Picker';
import RadioItem from './components/RadioItem';
import Scroller from './components/Scroller';
import Slider from './components/Slider';
import Spinner from './components/Spinner';
import SwitchItem from './components/SwitchItem';
import TemperatureControl from './components/TemperatureControl';
import ThumbnailItem from './components/ThumbnailItem';
import ToggleButton from './components/ToggleButton';
import VirtualList from './components/VirtualList';
import WindDirectionControl from './components/WindDirectionControl';

const agateComponents = {
	ArcPicker,
	ArcSlider,
	Button,
	CheckboxItem,
	DateTimePicker,
	FanSpeedControl,
	Heading,
	ImageItem,
	IncrementSlider,
	Input,
	Icon,
	Item,
	LabeledIcon,
	LabeledIconButton,
	ProgressBar,
	Popup,
	Picker,
	RadioItem,
	Scroller,
	Slider,
	Spinner,
	SwitchItem,
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
