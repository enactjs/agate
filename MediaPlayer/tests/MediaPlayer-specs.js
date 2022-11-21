import ilib from 'ilib';
import '@testing-library/jest-dom';
import {fireEvent, render, screen, waitFor} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import MediaPlayer from '../MediaPlayer';

const blur = (slider) => fireEvent.blur(slider);
const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});

// https://github.com/jsdom/jsdom/issues/2155
// jsdom doesn't support any loading or playback media operations. As a workaround we use these stubs:
window.HTMLMediaElement.prototype.load = () => {};
window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

describe('MediaPlayer', () => {
	const audioFiles = [
		'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3',
		'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3',
		'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Oceanic-Dawn-160.mp3',
		'https://sampleswap.org/mp3/artist/26546/benzoul_lovevoodoo-160.mp3',
		'https://sampleswap.org/mp3/artist/19139/MarkNine_In-my-Place-160.mp3',
		'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Dont-Forget-To-Be-Yourself-160.mp3'
	];

	describe('changing sources', () => {
		test('should use the same node when changing the `source`', () => {
			const handleUpdate = jest.fn();
			// `onUpdate` added for code coverage purposes
			const {rerender} = render(
				<MediaPlayer data-testid="media-player" onUpdate={handleUpdate}>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);
			const expected = screen.getByTestId('media-player');

			rerender(<MediaPlayer data-testid="media-player" onUpdate={handleUpdate} source="abc.mp3" />);

			const actual = screen.getByTestId('media-player');

			expect(actual).toBe(expected);
		});

		test('should use same `source` when removing `source`', () => {
			const {rerender} = render(
				<MediaPlayer data-testid="media-player">
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);
			const expected = screen.getByTestId('media-player');

			rerender(<MediaPlayer data-testid="media-player" source="no source" />);

			const actual = screen.getByTestId('media-player');

			expect(actual).toBe(expected);
		});

		test('should reuse source node over two changes', () => {
			const {rerender} = render(
				<MediaPlayer data-testid="media-player">
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);
			const expected = screen.getByTestId('media-player');

			rerender(<MediaPlayer data-testid="media-player" source="abc.mp3" />);

			const actual = screen.getByTestId('media-player');

			expect(actual).toBe(expected);

			rerender(<MediaPlayer data-testid="media-player" source="def.mp3" />);

			const last = screen.getByTestId('media-player');

			expect(last).toBe(expected);
		});

		test('should activate the mediaPlayer slider on enter keyup', () => {
			render(
				<MediaPlayer>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);
			const mediaSlider = screen.getByRole('slider', {hidden: true});

			activate(mediaSlider);

			expect(mediaSlider).toHaveClass('active');
		});

		test('should deactivate the mediaPlayer slider on blur', () => {
			render(
				<MediaPlayer>
					{
						audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))
					}
				</MediaPlayer>
			);
			const mediaSlider = screen.getByRole('slider', {hidden: true});

			activate(mediaSlider);
			blur(mediaSlider);

			expect(mediaSlider).not.toHaveClass('active');
		});
	});

	describe('methods and props', () => {
		test('should have `audio` media', () => {
			render(
				<MediaPlayer data-testid="media-player">
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);

			const audioMedia = screen.getByTestId('media-player').children.item(0);

			const expected = 'AUDIO';
			const actual = audioMedia.tagName;

			expect(actual).toBe(expected);
		});

		test('should play next audio media when `Next` button is clicked', () => {
			const handleNext = jest.fn();
			// onNext added for code coverage purposes
			render(
				<MediaPlayer data-testid="media-player" onNext={handleNext}>
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const nextButton = screen.getByLabelText('Next');

			userEvent.click(nextButton);
			const audioSource = screen.getByTestId('media-player').children.item(0).children.item(0);

			const expected = 'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3'; // second mp3 file from audioFiles
			expect(audioSource).toHaveProperty('src', expected);
		});

		test('should call `onPlay` when `Play` button is clicked', async () => {
			const handlePlay = jest.fn();
			render(
				<MediaPlayer onPlay={handlePlay}>
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const playButton = screen.getByLabelText('Play');

			userEvent.click(playButton);

			await waitFor(() => {
				expect(handlePlay).toHaveBeenCalled();
			});
		});

		test('should play previous audio media when `Previous` button is clicked', () => {
			const handlePrevious = jest.fn();
			// `onPrevious` added for code coverage purposes
			render(
				<MediaPlayer data-testid="media-player" onPrevious={handlePrevious}>
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const audioSource = screen.getByTestId('media-player').children.item(0).children.item(0);
			const nextButton = screen.getByLabelText('Next');
			const previousButton = screen.getByLabelText('Previous');

			userEvent.click(nextButton); // go to next audio media - audioFiles[1]
			userEvent.click(previousButton); // go back to first audio media - audioFiles[0]

			const expected = 'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3';

			expect(audioSource).toHaveProperty('src', expected);
		});

		test('should play last audio media in the playlist when `Previous` button is clicked and first media in playlist is playing and `repeat=all`', () => {
			const handlePrevious = jest.fn();
			// `onPrevious` added for code coverage purposes
			render(
				<MediaPlayer data-testid="media-player" onPrevious={handlePrevious}>
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);

			const previousButton = screen.getByLabelText('Previous');

			const repeatButton = screen.getByLabelText('Repeat');

			userEvent.click(repeatButton);
			userEvent.click(repeatButton);

			userEvent.click(previousButton); // go back to last audio media - audioFiles[5]

			const audioSource = screen.getByTestId('media-player').children.item(0).children.item(0);
			const expected = 'https://sampleswap.org/mp3/artist/47067/DJ-Masque_Dont-Forget-To-Be-Yourself-160.mp3';

			expect(audioSource).toHaveProperty('src', expected);
		});

		test('should restart the playlist when `Next` button is clicked and last media in playlist is playing and `repeat=all`', () => {
			const handleNext = jest.fn();
			// `onNext` added for code coverage purposes
			render(
				<MediaPlayer data-testid="media-player" onNext={handleNext}>
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);

			const nextButton = screen.getByLabelText('Next');

			const repeatButton = screen.getByLabelText('Repeat');

			userEvent.click(repeatButton);
			userEvent.click(repeatButton);

			userEvent.click(nextButton);
			userEvent.click(nextButton);
			userEvent.click(nextButton);
			userEvent.click(nextButton);
			userEvent.click(nextButton);
			userEvent.click(nextButton); // go back to first audio media - audioFiles[0]

			const audioSource = screen.getByTestId('media-player').children.item(0).children.item(0);
			const expected = 'https://sampleswap.org/mp3/artist/254731/BossPlayer_Your-Right-Here-160.mp3';

			expect(audioSource).toHaveProperty('src', expected);
		});

		test('should not play audio media in order when `Shuffle` button is clicked', () => {
			const handleShuffle = jest.fn();
			render(
				<MediaPlayer data-testid="media-player" onShuffle={handleShuffle}>
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const audioSource = screen.getByTestId('media-player').children.item(0).children.item(0);
			const nextButton = screen.getByLabelText('Next');
			const playButton = screen.getByLabelText('Play');
			const shuffleButton = screen.getByLabelText('Shuffle');

			userEvent.click(shuffleButton);
			userEvent.click(playButton);
			userEvent.click(nextButton);

			const expected = 'https://sampleswap.org/mp3/artist/78152/HiatusManJBanner_Show-Stopper-160.mp3'; // second audio media from audioFiles

			expect(audioSource).not.toHaveProperty('src', expected);
		});

		test('should update `repeat` value of controls frame to `one` when `repeat` button is clicked once', () => {
			const handleRepeat = jest.fn();
			// `onRepeat` added for code coverage purposes
			render(
				<MediaPlayer data-testid="media-player" onRepeat={handleRepeat}>
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const repeatButton = screen.getByLabelText('Repeat');
			const controlsFrame = screen.getByTestId('media-player').children.item(3);

			userEvent.click(repeatButton);

			expect(controlsFrame).toHaveAttribute('repeat', 'one');
		});

		test('should update `repeat` value of controls frame to `all` when `repeat` button is clicked twice', () => {
			render(
				<MediaPlayer data-testid="media-player">
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const repeatButton = screen.getByLabelText('Repeat');
			const controlsFrame = screen.getByTestId('media-player').children.item(3);

			userEvent.click(repeatButton);
			userEvent.click(repeatButton);

			expect(controlsFrame).toHaveAttribute('repeat', 'all');
		});

		test('should update `repeat` value of controls frame to back to `none` when `repeat` button is clicked 3 times', () => {
			render(
				<MediaPlayer data-testid="media-player">
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const repeatButton = screen.getByLabelText('Repeat');
			const controlsFrame = screen.getByTestId('media-player').children.item(3);

			userEvent.click(repeatButton);
			userEvent.click(repeatButton);
			userEvent.click(repeatButton);

			expect(controlsFrame).toHaveAttribute('repeat', 'none');
		});

		test('should have `disabled` attribute when `disabled` is defined', () => {
			render(
				<MediaPlayer data-testid="media-player" disabled>
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const mediaSlider = screen.getByRole('slider', {hidden: true});
			const mediaButtons = screen.getAllByRole('button');

			expect(mediaSlider).toHaveAttribute('disabled');
			mediaButtons.forEach(button => {
				expect(button).toHaveAttribute('disabled');
			});
		});

		test('should render `currentTime`', () => {
			render(
				<MediaPlayer data-testid="media-player">
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFile} type="audio/mp3" />))}
				</MediaPlayer>
			);

			const currentTime = screen.getByText('00:00');

			expect(currentTime).toBeInTheDocument();
		});

		test('should have `paused` class on render', () => {
			render(
				<MediaPlayer data-testid="media-player">
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFiles[0]} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const mediaSlider = screen.getByRole('slider', {hidden: true});

			expect(mediaSlider).toHaveClass('paused');
		});

		test('should have `full` class name when `type` is not specified', () => {
			render(
				<MediaPlayer data-testid="media-player">
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFiles[0]} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const mediaPlayer = screen.getByTestId('media-player');

			const expected = 'full';

			expect(mediaPlayer).toHaveClass(expected);
		});

		test('should have `tiny` class name when `type="tiny"`', () => {
			render(
				<MediaPlayer data-testid="media-player" type="tiny">
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFiles[0]} type="audio/mp3" />))}
				</MediaPlayer>
			);
			const mediaPlayer = screen.getByTestId('media-player');

			const expected = 'tiny';

			expect(mediaPlayer).toHaveClass(expected);
		});

		test('should change the format of the displayed time based on the current `locale`', () => {
			ilib.setLocale('si-LK');
			render(
				<MediaPlayer locale="si-LK">
					{audioFiles.map((audioFile, index) => (<source key={index} src={audioFiles[0]} type="audio/mp3" />))}
				</MediaPlayer>
			);

			const currentTime = screen.getByText('00.00');

			expect(currentTime).toBeInTheDocument();
		});
	});
});
