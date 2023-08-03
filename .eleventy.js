
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("assets");
    eleventyConfig.addPassthroughCopy("images");
    eleventyConfig.addPassthroughCopy("projects");
    eleventyConfig.addPlugin(eleventyNavigationPlugin);
    eleventyConfig.setNunjucksEnvironmentOptions({
      throwOnUndefined: true,
    });


    return {
      dir: {
        // ⚠️ These values are both relative to your input directory.
        output: "public",
        includes: "_includes",
        layouts: "_layouts"
      }
    }
    };
