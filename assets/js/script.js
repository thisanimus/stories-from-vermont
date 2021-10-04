import AudioPlayer from './components/audio-player.js';
import ImageDetails from './components/image-details.js';

const audioPlayers = document.querySelectorAll('.audio-player');
audioPlayers.forEach((audioPlayer) => {
	new AudioPlayer(audioPlayer);
});

const imageDetailWrappers = document.querySelectorAll('.image-details');
imageDetailWrappers.forEach((imageDetailWrapper) => {
	new ImageDetails(imageDetailWrapper);
});

const form = document.forms.subscribe;
const messageButton = document.getElementById('message-button');

if (form && messageButton) {
	messageButton.addEventListener('click', (e) => {
		if (form.dataset.state == 'subscribe') {
			form.dataset.state = 'form';
			form.querySelector('[name="email"]').focus();
		}
		setTimeout(() => {
			messageButton.type = 'submit';
		}, 1);
	});

	form.addEventListener('submit', (e) => {
		e.preventDefault();

		// handle your form submission here

		if (form.dataset.state == 'form') {
			document.activeElement.blur();
			form.dataset.state = 'thank-you';
		}
	});
}
