import {generateTestData} from '@enact/ui-test-utils/utils';

import BodyText from './components/BodyText';
import Button from './components/Button';
import ColorPicker from './components/ColorPicker';
import DatePicker from './components/DatePicker';
import DateTimePicker from './components/DateTimePicker';
import Heading from './components/Heading';
import IncrementSlider from './components/IncrementSlider';
import Input from './components/Input';
import Icon from './components/Icon';
import Item from './components/Item';
import LabeledIcon from './components/LabeledIcon';
import LabeledIconButton from './components/LabeledIconButton';
import MediaPlayer from './components/MediaPlayer';
import ProgressBar from './components/ProgressBar';
import Popup from './components/Popup';
import Picker from './components/Picker';
import RadioItem from './components/RadioItem';
import RangePicker from './components/RangePicker';
import Slider from './components/Slider';
import SliderButton from './components/SliderButton';
import SwitchItem from './components/SwitchItem';
import TimePicker from './components/TimePicker';
import ToggleButton from './components/ToggleButton';

const agateComponents = {
	BodyText,
	Button,
	ColorPicker,
	DatePicker,
	DateTimePicker,
	Heading,
	IncrementSlider,
	Input,
	Icon,
	Item,
	LabeledIcon,
	LabeledIconButton,
	MediaPlayer,
	ProgressBar,
	Popup,
	Picker,
	RadioItem,
	RangePicker,
	Slider,
	SliderButton,
	SwitchItem,
	TimePicker,
	ToggleButton
};

const agateTestMetadata = {};


Object.keys(agateComponents).forEach((component) => {
	let metaData = generateTestData(component, agateComponents[component]);
	agateTestMetadata[component] = metaData;
});

export default agateComponents;
export {agateComponents, agateTestMetadata};
