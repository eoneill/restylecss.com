"use strict";

var merge = require("lodash.merge");
var minimatch = require("minimatch");

module.exports = function(config) {

  return function(files, metalsmith, done) {

    var collections = metalsmith._metadata.collections;
    var topics = {};
    var filesNext = [];

    Object.keys(files).forEach(function(file) {
      var data = files[file];
      var aside = data.aside;

      if (aside !== false && minimatch(file, "**/*.html")) {
        if (aside === true || aside === undefined) {
          aside = data.isIndex ? aside.shortpath : data.collection;
        }

        if (aside) {
          filesNext.push(file);
          aside = [].concat(aside);
          if (!data.isIndex) {
            aside.forEach(function(collection) {
              var topic = data.topic;
              collection = topics[collection] = topics[collection] || {};
              collection[topic] = collection[topic] || [];
              collection[topic].push(data);
              collection[topic].title = topic;
            });
          }
        }
        data.aside = aside;
      }
    });

    filesNext.forEach(function(file) {
      var data = files[file];

      data.aside = data.aside.map(function(collection) {
        return {
          title: config.site.collections && config.site.collections[collection] || collection,
          topics: topics[collection]
        };
      });

      if (data.page) {
        data.page.aside = data.aside;
      }
    });

    done();
  }
};
