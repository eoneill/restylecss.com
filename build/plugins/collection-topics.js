"use strict";

module.exports = function(config) {

  return function(files, metalsmith, done) {

    var metadata = metalsmith.metadata();

    var collections = metadata.collections;

    Object.keys(collections).forEach(function(name) {
      var collection = collections[name];

      if (collection) {
        collection.forEach(function(page) {
          var topic = page.topic;
          collection.topics = collection.topics || {};

          collection.topics[topic] = collection.topics[topic] || [];
          collection.topics[topic].title = topic;
          collection.topics[topic].push(page);
        });
      }
    });

    metalsmith.metadata(metadata);

    done();
  };
};
