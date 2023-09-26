/**
 * I strive to keep the `.eleventy.js` file clean and uncluttered. Most adjustments must be made in:
 *  - `src/config/collections.js`
 *  - `src/config/filters.js`
 *  - `src/config/plugins.js`
 *  - `src/config/shortcodes.js`
 *  - `src/config/transforms.js`
 */


const {EleventyI18nPlugin} = require('@11ty/eleventy');
// const Image = require("@11ty/eleventy-img");

module.exports = function (eleventyConfig) {
   // Watch CSS files for changes
   eleventyConfig.setBrowserSyncConfig({
		files: './_dist/css/**/*.css'
	});

  // Tell 11ty to use the .eleventyignore and ignore our .gitignore file
  eleventyConfig.setUseGitIgnore(false);

  // 	--------------------- Custom Watch Targets -----------------------
  eleventyConfig.addWatchTarget('./src/assets');
  eleventyConfig.addWatchTarget('./utils/*.js');
  
  // 	--------------------- Default language -----------------------
  eleventyConfig.addPlugin(EleventyI18nPlugin, {
    defaultLanguage: 'es' // Required
  });

  
  // 	--------------------- Filter from collections -----------------------
  eleventyConfig.addFilter("limit", function (arr, limit) {
    return arr.slice(0, limit);
  });

  // module import collections
const {
  getProjectsEN,
  getBlogsEN,
  getProjectsES,
  getBlogsES,
  getBlogsAllFullLang,
  getBlogsAllLang
} = require('./config/collections/index.js');

// module import shortcodes
const {
  imageShortcode,
  // imageShortcodePlaceholder,
  // liteYoutube
} = require('./config/shortcodes/index.js');

  // 	--------------------- Custom shortcodes ---------------------
  eleventyConfig.addNunjucksAsyncShortcode('image', imageShortcode);
  // eleventyConfig.addNunjucksAsyncShortcode('imagePlaceholder', imageShortcodePlaceholder);
  // eleventyConfig.addShortcode('youtube', liteYoutube);
  eleventyConfig.addShortcode('year', () => `${new Date().getFullYear()}`); // current year, by Stephanie Eckles
  eleventyConfig.addShortcode('packageVersion', () => `v${packageVersion}`);

  // 	--------------------- Custom collections -----------------------
  eleventyConfig.addCollection('projects_en', getProjectsEN);
  eleventyConfig.addCollection('blog_en', getBlogsEN);
  eleventyConfig.addCollection('projects_es', getProjectsES);
  eleventyConfig.addCollection('blog_es', getBlogsES);
  eleventyConfig.addCollection('blog_all_full', getBlogsAllFullLang);
  eleventyConfig.addCollection('blog_all', getBlogsAllLang);

  // 	--------------------- Passthrough Items -----------------------
  eleventyConfig.addPassthroughCopy('src/favicon.ico');
  eleventyConfig.addPassthroughCopy("src/assets/fonts/");
  eleventyConfig.addPassthroughCopy("src/assets/images/");

  ['src/favicon.ico', 'src/opengraph.jpg'].forEach(item =>
    eleventyConfig.addPassthroughCopy(item)
  );

  // eleventyConfig.addShortcode("image", async function(src, alt, sizes = "100vw") {
	// 	if(alt === undefined) {
	// 		// You bet we throw an error on missing alt (alt="" works okay)
	// 		throw new Error(`Missing \`alt\` on responsiveimage from: ${src}`);
	// 	}

	// 	let metadata = await Image(src, {
	// 		widths: [300, 600],
	// 		formats: ['webp', 'jpeg', 'png']
	// 	});

	// 	let lowsrc = metadata.jpeg[0];
	// 	let highsrc = metadata.jpeg[metadata.jpeg.length - 1];

	// 	return `<picture>
	// 		${Object.values(metadata).map(imageFormat => {
	// 			return `  <source type="${imageFormat[0].sourceType}" srcset="${imageFormat.map(entry => entry.srcset).join(", ")}" sizes="${sizes}">`;
	// 		}).join("\n")}
	// 			<img
	// 				src="${lowsrc.url}"
	// 				width="${highsrc.width}"
	// 				height="${highsrc.height}"
	// 				alt="${alt}"
	// 				loading="lazy"
	// 				decoding="async">
	// 		</picture>`;
	// });

  return {
    dir: {
      input: 'src',
      output: 'dist',
      includes: '_includes',
      layouts: '_layouts'
    },
    markdownTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk'
  };
};
