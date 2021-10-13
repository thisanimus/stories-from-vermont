const Image = require('@11ty/eleventy-img');
const exifr = require('exifr');
const NodeID3 = require('node-id3');

const path = require('path');
module.exports = function (eleventyConfig) {
	eleventyConfig.addLiquidFilter('exif', getExif);
	eleventyConfig.addLiquidFilter('shutter', convertShutter);
	eleventyConfig.addLiquidFilter('id3', getId3);

	eleventyConfig.addLiquidShortcode('image', imageShortcode);
	eleventyConfig.addPassthroughCopy('./assets');

	eleventyConfig.setBrowserSyncConfig({
		files: ['./**/*.css', './**/*.js'],
	});
	return {
		dir: {
			layouts: '_layouts',
		},
		htmlTemplateEngine: 'liquid',
		markdownTemplateEngine: 'liquid',
	};
};

function convertShutter(decimal) {
	var denominator = 1 / parseFloat(decimal);
	return '1/' + Math.round(denominator);
}

async function imageShortcode(src, classes, alt) {
	let sizes = '(min-width: 1024px) 100vw, 50vw';
	let srcPrefix = `./assets/img/`;
	src = srcPrefix + src;

	console.log(classes);

	console.log(`Generating image(s) from:  ${src}`);

	if (!alt) {
		let exifAlt = await exifr.parse(src, ['ImageDescription']);

		if (exifAlt !== undefined) {
			alt = exifAlt.ImageDescription;
		} else {
			// Throw an error on missing alt (alt="" works okay)
			throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
		}
	}
	let defaultFormat = src.endsWith('.png') ? 'png' : 'jpeg';

	let metadata = await Image(src, {
		widths: [600, 900, 1500],
		formats: [defaultFormat, 'webp'],
		urlPath: '/assets/img',
		outputDir: './_site/assets/img',
		/* =====
	  Now we'll make sure each resulting file's name will 
	  make sense to you. **This** is why you need 
	  that `path` statement mentioned earlier.
	  ===== */
		filenameFormat: function (id, src, width, format, options) {
			const extension = path.extname(src);
			const name = path.basename(src, extension);
			return `${name}-${width}w.${format}`;
		},
	});
	let lowsrc = metadata[defaultFormat][0];
	let pictureClass = classes !== '' ? 'class="' + classes + '"' : '';
	return `<picture ${pictureClass}>
	  ${Object.values(metadata)
			.map((imageFormat) => {
				return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat
					.map((entry) => entry.srcset)
					.join(', ')}" sizes="${sizes}">`;
			})
			.join('\n')}
	  <img
		src="${lowsrc.url}"
		width="${lowsrc.width}"
		height="${lowsrc.height}"
		alt="${alt}"
		loading="lazy"
		decoding="async">
	</picture>`;
}

async function getExif(file) {
	let metadata = await exifr.parse('./assets/img/' + file);
	return metadata;
}

function getId3(file) {
	const tags = NodeID3.read('./assets/audio/' + file);
	return tags;
}
