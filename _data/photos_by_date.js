// Import the filesystem module
const fs = require('fs');
const path = require('path');
const exifr = require('exifr');

const getPhotosByDate = () => {
	const photoDir = path.resolve(__dirname, '../assets/img/photos');
	return fs.promises.readdir(photoDir).then((filenames) => {
		const exifPromises = filenames.map((filename) => {
			return exifr.parse(photoDir + '/' + filename).then((m) => {
				m.path = `photos/${filename}`;
				m.date = m.CreateDate;
				return m;
			});
		});
		return Promise.all(exifPromises).then((photos) => {
			let years = [];

			photos.forEach((photo) => {
				// get the date
				const date = new Date(photo.CreateDate);
				// get the year
				const y = date.getFullYear();
				// get the month
				const mi = date.getMonth();
				const m = date.toLocaleString('en-US', { month: 'short' });
				const d = date.getDate();

				if (!years.find((e) => e.year == y)) {
					years.push({ year: y, months: [] });
				}
				const thisYear = years.find((e) => e.year == y);

				if (!thisYear.months.find((e) => e.id == mi)) {
					thisYear.months.push({ name: m, id: mi, days: [] });
				}
				const thisMonth = thisYear.months.find((e) => e.id == mi);

				if (!thisMonth.days.find((e) => e.date == d)) {
					thisMonth.days.push({ date: d, photos: [] });
				}
				const today = thisMonth.days.find((e) => e.date == d);

				today.photos.push(photo);
			});

			years = years.reverse();
			years.forEach((year) => {
				year.months.sort((a, b) => b.id - a.id);
				year.months.forEach((month) => {
					month.days.sort((a, b) => b.date - a.date);
				});
			});

			return years;
		});
	});
};

module.exports = getPhotosByDate;
