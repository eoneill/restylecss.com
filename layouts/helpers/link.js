"use strict";

var rFullyQualifiedUrl = /^(?:https?\:)?\/\//;

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("link", function(path) {
    path = rFullyQualifiedUrl.test(path) ? path : (config.site.url || "") + "/" + (path || "");

    return path.replace(/\{(git|package)\.(repo|account|name)\}/g, function(match, type, key) {
      return config.site[type][key];
    });
  });
};
