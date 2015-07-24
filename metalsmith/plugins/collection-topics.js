"use strict";

var merge = require("lodash.merge");
var minimatch = require("minimatch");

module.exports = function(config) {

  return function(files, metalsmith, done) {

    var metadata = metalsmith.metadata();

    var collections = metadata.collections;

    Object.keys(collections).forEach(function(name) {
      var collection = collections[name];
      var topics = {};

      collection.forEach(function(page) {
        var topic = page.topic;
        var srcPage;
        collection.topics = collection.topics || {};

        collection.topics[topic] = collection.topics[topic] || [];
        collection.topics[topic].title = topic;
        collection.topics[topic].push(page);
      });
    });

    metalsmith.metadata(metadata);

    done();
  }
};
