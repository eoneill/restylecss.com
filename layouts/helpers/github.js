"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("github", function(path) {
    return "https://github.com/" + path;
  });
};