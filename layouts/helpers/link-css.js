"use strict";

var path = require("path");

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("link-css", function(stylesheet) {
    return (config.site.url || "") + "/styles/" + path.basename(stylesheet, ".css") + ".css";
  });
};
