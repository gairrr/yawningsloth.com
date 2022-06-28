const fse = require("fs-extra") ;
const markdownIt = require("markdown-it");
const metadata = require("./_data/metadata.json");
const { DateTime } = require("luxon");

module.exports = function(eleventyConfig) {

  // Support envvars on template files
  eleventyConfig.addGlobalData("env", require("dotenv").config().parsed);

  // Passthrough files
  eleventyConfig.addPassthroughCopy("style.css");

  // Filters
  eleventyConfig.addFilter("canonicalUrl", function(permalink) {
    return "https://" + metadata.domain + permalink;
  });

  eleventyConfig.addFilter("machineReadableDate", function(isoDate) {
    return DateTime.fromISO(isoDate);
  });

  // Markdown library
  let options = {
    html: true,
    breaks: false,
    linkify: true
  };
  eleventyConfig.setLibrary("md", markdownIt(options));

  // Eleventy events
  eleventyConfig.on("eleventy.before", async () => {

    // Clean up the output directory at evety build.
    await fse.remove("./_site/")
      .then(() => {
        console.log("Success! Clean up output directory")
      })
      .catch(err => {
        console.error(err)
      });

  });
};
