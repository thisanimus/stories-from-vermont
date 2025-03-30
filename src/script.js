import AudioPlayer from '../_includes/audio_player/audio_player.js';
import ImageDetails from '../_includes/image_details/image_details.js';
import Gallery from '../_includes/gallery/gallery.js';

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
const weatherUrl =
	'https://api.openweathermap.org/data/2.5/weather?zip=05478&units=imperial&appid=24c8c0ba644f296178056dc416997e4c';
async function fetchJsonData(url) {
	const response = await fetch(url);
	const data = await response.json();
	return data;
}

async function fetchTextData(url) {
	const response = await fetch(url);
	const text = await response.text();
	return text;
}

const weather = document.querySelector('.weather');
if (weather) {
	fetchJsonData(weatherUrl).then((data) => {
		let ts = Math.floor(Date.now() / 1000);
		let now = ts >= data.sys.sunrise && ts <= data.sys.sunset ? 'today' : 'tonight';
		let temp = parseInt(data.main.temp);
		let feel;
		if (temp >= 80) {
			feel = 'hot';
		} else if (temp >= 60 && temp < 80) {
			feel = 'warm';
		} else if (temp >= 30 && temp < 60) {
			feel = 'cool';
		} else if (temp >= 0 < 30) {
			feel = 'cold';
		} else if (temp < 0) {
			feel = 'really cold';
		}
		if (data.weather[0].icon) {
			fetchTextData('/assets/img/weather/' + data.weather[0].icon + '.svg').then((text) => {
				let markup = `
					<div class="icon">${text}</div>
					<div class="temp">${temp}°</div>
					<div class="description">It's ${feel} with ${data.weather[0].description} in Vermont ${now}.</div>
				`;
				weather.innerHTML = markup;
			});
		}
	});
}

const gallery = document.querySelector('.gallery');
if (gallery) {
	new Gallery(gallery);
}
