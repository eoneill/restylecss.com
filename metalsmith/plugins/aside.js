"use strict";

var merge = require("lodash.merge");
var minimatch = require("minimatch");

module.exports = function(config) {

  return function(files, metalsmith, done) {
    var collections = {};
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
          if (aside !== "all") {
            aside = [].concat(aside);
            if (!data.isIndex) {
              aside.forEach(function(collection) {
                collection = collections[collection] = collections[collection] || [];
                if (data.topic) {
                  collection.topics = collection.topics || {};
                  collection.topics[data.topic] = collection.topics[data.topic] || [];
                  collection.topics[data.topic].push(data);
                  collection.topics[data.topic].title = data.topic;
                }
                else {
                  collection.push(data);
                }
              });
            }
          }
        }
        else {
          aside = false;
        }
        data.aside = aside;
      }
    });

    console.log("got files to process", filesNext);

    filesNext.forEach(function(file) {
      var data = files[file];

      console.log("before...", file, data.aside);

      data.aside = data.aside.map(function(collection) {
        return {
          collection: collection,
          title: config.site.collections && config.site.collections[collection] || collection,
          items: collections[collection],
          topics: collections[collection].topics
        };
      });

      if (data.page) {
        data.page.aside = data.aside;
      }

      console.log("after...", file, data.aside);
    });

    done();
  }
};
