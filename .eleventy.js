const Image = require('@11ty/eleventy-img');
const path = require('path');
module.exports = function (eleventyConfig) {
	eleventyConfig.setFrontMatterParsingOptions({
		excerpt: true,
		// Optional, default is "---"
		excerpt_separator: '<!-- excerpt -->',
	});

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

async function imageShortcode(src, alt, classString) {
	let sizes = '(min-width: 1024px) 100vw, 50vw';
	let srcPrefix = `./assets/img/`;
	src = srcPrefix + src;
	console.log(`Generating image(s) from:  ${src}`);
	if (alt === undefined) {
		// Throw an error on missing alt (alt="" works okay)
		throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
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
	let pictureClass = classString !== '' ? 'class="' + classString + '"' : '';
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
