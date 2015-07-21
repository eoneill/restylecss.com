"use strict";

var merge = require("lodash.merge");
var minimatch = require("minimatch");
var cheerio = require("cheerio");

module.exports = function(options) {

  // merge in the options
  options = merge({
    pattern: "**/*.html",
    truncate: 150,
    wordBreak: false,
    ellipsis: "…"
  }, options);

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var contents;
      var excerpt;
      var fullExcerpt;
      var $;

      // if the file pattern matches...
      if (minimatch(file, options.pattern)) {
        contents = data.contents && data.contents.toString();
        if (contents) {
          // get the contents as plain text
          $ = cheerio.load(contents);
          excerpt = fullExcerpt = $("p:not(:empty)").first().text();

          if (options.truncate && fullExcerpt.length > options.truncate) {
            // truncate it
            excerpt = excerpt.substring(0, options.truncate);
            // if we're not supposed to break on words...
            if (!options.wordBreak) {
              // add the word fragment back in
              excerpt += fullExcerpt.substring(options.truncate).match(/^(\S*)/)[0];
            }
            // if the truncated excerpt is shorter than the full excerpt...
            if (excerpt.length < fullExcerpt.length) {
              // add the ellipsis
              excerpt += (options.ellipsis || "");
            }
          }

          data.excerpt = excerpt;
          if (data.page) {
            data.page.excerpt = excerpt;
          }
        }
      }
    });
    done();
  }
};
