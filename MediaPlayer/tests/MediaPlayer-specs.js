import '@testing-library/jest-dom';
import {fireEvent, render, screen} from '@testing-library/react';

import MediaPlayer from '../MediaPlayer';

const blur = (slider) => fireEvent.blur(slider);
const activate = (slider) => fireEvent.keyUp(slider, {keyCode: 13});

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
});
