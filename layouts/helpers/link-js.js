"use strict";

var path = require("path");

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("link-js", function(script) {
    return (config.site.url || "") + "/scripts/" + path.basename(script, ".js") + ".js";
  });
};
