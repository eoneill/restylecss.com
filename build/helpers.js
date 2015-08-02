"use strict";

var glob = require("glob");
var path = require("path");

module.exports = function(Handlebars, config) {
  glob.sync("./layouts/helpers/**/[^_.]*.js").forEach(function(helper) {
    require(path.resolve(helper))(Handlebars, config);
  });
};
