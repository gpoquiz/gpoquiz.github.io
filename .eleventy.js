const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");
const filters = require('./src/_includes/filters.js');

function passthroughCopies(eleventyConfig) {
  eleventyConfig.addPassthroughCopy("assets");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("projects");
}

module.exports = function (eleventyConfig) {
  passthroughCopies(eleventyConfig);
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  eleventyConfig.setNunjucksEnvironmentOptions({
    throwOnUndefined: true,
  });
  eleventyConfig.addGlobalData("env", process.env);

  eleventyConfig.addFilter("navigationKeyFilter", filters.navigationKeyFilter);

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      input:"src",
      layouts: "_layouts",
    },
  };
};
