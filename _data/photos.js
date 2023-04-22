const fs = require('fs');
const path = require('path');
const exifr = require('exifr');
/*
// Import the filesystem module
const fs = require('fs');
const path = require('path');

const photoDir = path.resolve(__dirname, '../assets/img/photos');

// Function to get current filenames
// in directory
const filenames = fs.readdirSync(photoDir);
const getPhotos = () => {
	return filenames.map((e) => `photos/${e}`);
};
module.exports = getPhotos;
*/

// Import the filesystem module

const getPhotos = async () => {
	const photoDir = path.resolve(__dirname, '../assets/img/photos');
	return fs.promises.readdir(photoDir).then((files) => {
		const filenames = files.filter((el) =>
			['.jpg', '.JPG', '.jpeg', '.JPEG'].includes(path.extname(el))
		);
		const exifPromises = filenames.map((filename) => {
			return exifr.parse(photoDir + '/' + filename).then((m) => {
				m.path = `photos/${filename}`;
				m.date = m.CreateDate;
				return m;
			});
		});
		return Promise.all(exifPromises);
	});
};

module.exports = getPhotos;
