"use strict";

var merge = require("lodash.merge");
var minimatch = require("minimatch");
var cheerio = require("cheerio");

module.exports = function(options) {

  // merge in the options
  options = merge({
    pattern: "**/*.html",
    shortCode: /(\[excerpt\])(.*)(\[\/excerpt\])/mi,
    truncate: 150,
    forceTruncate: false,
    wordBreak: false,
    tags: "p",
    ellipsis: "…"
  }, options);

  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var contents;
      var excerpt;
      var fullExcerpt;
      var fullText;
      var $;
      var matchText;
      var doNotTruncate;

      // if the file pattern matches...
      if (minimatch(file, options.pattern)) {
        contents = data.contents && data.contents.toString();
        if (contents) {
          // get the contents as plain text
          $ = cheerio.load(contents);
          fullText = $(options.tags).text() || $("*").text();

          // if the excerpt short codes are used, extract from that
          if (options.shortCode && options.shortCode.test(fullText)) {
            matchText = fullText.match(options.shortCode);
            fullExcerpt = matchText[2];
            if (fullExcerpt) {
              // whether or not to truncate the excerpt
              doNotTruncate = !options.forceTruncate;
              // remove the excerpt short codes
              contents = contents.replace(matchText[1], "").replace(matchText[3], "");
              // set the updated content
              data.contents = new Buffer(contents);
            }
          }

          // if we don't already have the excerpt from the short code, find it from the first non-empty node
          excerpt = fullExcerpt = fullExcerpt || $(options.tags.replace(/(?:,|$)/g, ":not(:empty)")).first().text();

          if (!doNotTruncate && options.truncate && fullExcerpt.length > options.truncate) {
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
  };
};
