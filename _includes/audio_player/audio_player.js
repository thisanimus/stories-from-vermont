export default class AudioPlayer {
	constructor(audioPlayer) {
		this.audioPlayer = audioPlayer;
		this.audio = this.audioPlayer.querySelector('audio');
		this.audio.load();
		this.audio.addEventListener(
			'loadedmetadata',
			() => {
				console.log(this.audio.duration);
				this.audioDuration = this.audioPlayer.querySelector('.duration');
				this.audioDuration.textContent = this.toTime(this.audio.duration);
				this.audioControls = this.audioPlayer.querySelector('.audio-controls');
				this.playpauseElement = this.audioControls.querySelector('.playpause');
				this.playpauseIcon = this.playpauseElement.querySelector('.icon');
				this.playpauseElement.addEventListener('click', (e) => {
					this.playPause();
				});
				this.currentTimeElement = this.audioControls.querySelector('.current');
				this.audio.addEventListener('timeupdate', (e) => {
					this.timeUpdate();
				});
				this.audio.addEventListener('ended', (e) => {
					this.audio.currentTime = 0;
					this.audio.pause();
				});
			},
			false
		);
	}

	playPause() {
		if (this.audio.paused) {
			this.audio.play();
			this.audioControls.dataset.state = 'playing';
			this.playpauseIcon.textContent = '▮▮';
		} else {
			this.audioControls.dataset.state = 'paused';
			this.audio.pause();
			this.playpauseIcon.textContent = '▶';
		}
	}
	toTime(seconds) {
		let hr = Math.floor(seconds / 3600);
		let min = Math.floor((seconds - hr * 3600) / 60);
		let sec = Math.floor(seconds - hr * 3600 - min * 60);
		if (sec < 10) {
			sec = '0' + sec;
		}
		return min + ':' + sec;
	}
	timeUpdate() {
		this.currentTimeElement.textContent = this.toTime(this.audio.currentTime);
	}
}
