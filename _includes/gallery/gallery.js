import Swiper from 'swiper';
import { Navigation } from 'swiper/modules';

export default class Gallery {
	constructor(gallery) {
		this.gallery = gallery;
		this.swiper = new Swiper('.swiper', {
			loop: true,
			preloadImages: false,
			lazy: {
				loadPrevNext: true,
				loadPrevNextAmount: 1,
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			modules: [Navigation],
		});
		this.thumbs = this.gallery.querySelectorAll('.gallery-thumb');
		this.closeButton = this.gallery.querySelector('.close');
		this.state = 'closed';
		this.thumbs.forEach((thumb) => {
			thumb.addEventListener('click', (e) => {
				const i = thumb.dataset.index;
				this.open(i);
			});
		});
		this.closeButton.addEventListener('click', (e) => {
			this.close();
		});
	}
	close() {
		this.state = 'closed';
		document.documentElement.dataset.galleryState = this.state;
	}
	open(i) {
		this.state = 'open';
		this.swiper.slideTo(i, 0, true);
		document.documentElement.dataset.galleryState = this.state;
	}
}
