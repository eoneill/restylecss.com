"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("url", function(path) {
    return path.replace(/\{git\.(repo|account)\}/g, function(match, key) {
      return config.site.git[key];
    });
  });
};