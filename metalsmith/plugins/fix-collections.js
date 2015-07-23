"use strict";

var merge = require("lodash.merge");

module.exports = function(config) {

  return function(files, metalsmith, done) {

    function findPageByFilename(filename) {
      var data;
      if (filename) {
        Object.keys(files).some(function(file) {
          if (files[file].filename === filename) {
            data = files[file];
            return true;
          }
        });
      }
      return data;
    }

    var metadata = metalsmith.metadata();
    var collections = metadata.collections;

    Object.keys(collections).forEach(function(name) {
      //var collection = collections[name];
      collections[name] = collections[name].map(function(page) {
        return merge(page, findPageByFilename(page.filename));
      });
    });

    done();
  }
};
