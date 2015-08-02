"use strict";

module.exports = function() {
  return function(files, metalsmith, done) {
    Object.keys(files).forEach(function(file) {
      if (/^([\._])|(\/([\._]).*?)/g.test(file)) {
        delete files[file];
      }
    });
    done();
  };
};
