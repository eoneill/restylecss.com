"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("link", function(path) {
    return (config.site.url || "") + "/" + path;
  });
};
