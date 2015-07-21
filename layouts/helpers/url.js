"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("url", function(path) {
    return path.replace(/\{(git|package)\.(repo|account|name)\}/g, function(match, type, key) {
      return config.site[type][key];
    });
  });
};
