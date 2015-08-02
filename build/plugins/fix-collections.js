"use strict";

var merge = require("lodash.merge");

module.exports = function(config) {

  return function(files, metalsmith, done) {

    var findPageBy = require("../findPageBy")(files);

    var metadata = metalsmith.metadata();
    var collections = metadata.collections;

    Object.keys(collections).forEach(function(name) {
      //var collection = collections[name];
      collections[name] = collections[name].map(function(page) {
        return merge(page, findPageBy("filename", page.filename));
      });
    });

    done();
  };
};
