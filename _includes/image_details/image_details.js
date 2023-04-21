export default class ImageDetails {
	constructor(wrapper) {
		this.wrapper = wrapper;
		this.parent = this.wrapper.closest('figure');
		this.toggle = this.wrapper.querySelector('button');
		this.parent.dataset.state = 'collapsed';
		this.toggle.addEventListener('click', (e) => {
			this.parent.dataset.state =
				this.parent.dataset.state == 'collapsed' ? 'expanded' : 'collapsed';
		});
	}
}
