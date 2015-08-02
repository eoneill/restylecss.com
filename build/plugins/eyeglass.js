// TODO - should probably publish this as metalsmith-eyeglass :)
"use strict";

var sass = require("metalsmith-sass");

module.exports = function(options) {
  options = options || {};

  if (!options.root) {
    console.log("[metalsmith-eyeglass] a `root` was not set, will probably have unexpected behavior. You should set a root option");
    options.root = process.cwd();
  }

  // allow custom engines to be passed in
  var eyeglass = (options.engines && options.engines.eyeglass) || require("eyeglass");

  // return the metalsmith-sass interface
  return function(files, metalsmith, done) {
    var src = metalsmith._source;

    Object.keys(options).forEach(function(option) {
      var value = options[option];
      if (typeof value === "string") {
        options[option] = value.replace("${source}", src);
      }
    });

    // hand it off to metalsmith-sass
    sass(eyeglass.decorate(options)).apply(sass, arguments);
  };
};
