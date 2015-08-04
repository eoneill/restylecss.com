"use strict";

var depcheck = require("depcheck");
var merge = require("lodash.merge");

// checks for unusued dependencies
module.exports = function(gulp, depends, options) {
    options = merge({
      root: process.cwd(),
      ignoreDirs: ["tmp"],
      ignoreMatches: [
        // ignore eyeglass, metalsmith, and restyle modules
        "{eyeglass,metalsmith,restyle}-*"
      ]
    }, options);

  gulp.task("depcheck", function() {
    return new Promise(function(fulfill, reject) {
      depcheck(options.root, options, function(unused) {
        var msg = "";
        var delim = "\n   * ";

        Object.keys(unused).forEach(function(type) {
          if (unused[type] && unused[type].length) {
            msg += "  Unused " + type + delim + unused[type].join(delim) + "\n";
          }
        });

        if (msg) {
          reject(new Error("Please clean up your package.json\n\n" + msg));
        }
        else {
          fulfill();
        }
      });
    });
  });
};
