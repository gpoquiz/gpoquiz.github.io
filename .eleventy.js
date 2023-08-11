const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const filters = require('./src/_includes/filters.js');
const shortcodes = require('./src/_includes/shortcodes.js')

function configPassthroughCopies(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/assets");
  eleventyConfig.addPassthroughCopy("src/old_website");
  eleventyConfig.addPassthroughCopy("src/images");
  eleventyConfig.addPassthroughCopy("src/projects");
}
function configFilters(eleventyConfig) {

  eleventyConfig.addFilter("navigationKeyFilter", filters.navigationKeyFilter);
  eleventyConfig.addFilter("articleFilter", filters.articleFilter);
  eleventyConfig.addFilter("navigationParentFilter", filters.navigationParentFilter);
}

module.exports = function (eleventyConfig) {
  configPassthroughCopies(eleventyConfig);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
  });
  eleventyConfig.addGlobalData("env", process.env);
  configFilters(eleventyConfig);

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      input:"src",
      layouts: "_layouts",
    },
  };
};
