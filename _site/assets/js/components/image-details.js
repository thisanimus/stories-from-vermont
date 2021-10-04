export default class ImageDetails {
	constructor(wrapper) {
		this.wrapper = wrapper;
		this.toggle = this.wrapper.querySelector('button');
		this.wrapper.dataset.state = 'collapsed';
		this.toggle.addEventListener('click', (e) => {
			this.wrapper.dataset.state = this.wrapper.dataset.state == 'collapsed' ? 'expanded' : 'collapsed';
		});
	}
}
