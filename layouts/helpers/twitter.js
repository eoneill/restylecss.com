"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("twitter", function(path) {
    return "https://twitter.com/" + path;
  });
};
