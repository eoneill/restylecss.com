"use strict";

module.exports = function(options) {
  options = options || {};

  return function debug(files, metalsmith, done) {
    if (options.logFiles !== false) {
      console.log("[metalsmith:files]", files);
    }
    if (options.logMetalsmith !== false) {
      console.log("[metalsmith:metalsmith]", metalsmith);
    }
    done();
  };
};
