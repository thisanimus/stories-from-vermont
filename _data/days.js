const getDays = () => {
	let days = [];
	const start = new Date();
	const end = new Date('2021-01-01');
	let loop = new Date(start);
	while (loop >= end) {
		days.push(loop);
		let newDate = loop.setDate(loop.getDate() - 1);
		loop = new Date(newDate);
	}
	return days;
};
module.exports = getDays;
