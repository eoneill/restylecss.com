"use strict";

var minimatch = require("minimatch");
//var cheerio = require("cheerio");

module.exports = function(options) {
  options = options || {};

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var contents;

      // if the file pattern matches...
      if (minimatch(file, "api/**/*.html")) {
        contents = data.contents && data.contents.toString();

        if (contents) {
          contents = contents.replace(/Eyeglass-restyle/g, "eyeglass-restyle");

          /*
          // replace the stylesheet
          var $ = cheerio.load(contents);
          $("link[rel=stylesheet]").first().attr("href", "/styles/sassdoc.css");

          contents = $.html();
          */

          data.contents = new Buffer(contents);
        }
      }
      else if (minimatch(file, "api/**/*.css")) {
        contents = data.contents && data.contents.toString();
        // replace some colors for now...
        if (contents) {
          contents = contents.replace(/(#dd5a6f|#5c4863)/g, "#3f3f3f");
          data.contents = new Buffer(contents);
        }
      }
    });
    done();
  };
};
