"use strict";

var camelCase = require("camelcase");
var plugins = require("load-metalsmith-plugins")();
var glob = require("glob");
var path = require("path");

module.exports = function(config) {

  glob.sync(path.join(__dirname, "/plugins/**/[^_.]*.js")).forEach(function(plugin) {
    var pluginName = camelCase(path.basename(plugin, ".js"));
    plugins[pluginName] = require(path.resolve(plugin));
  });

  return plugins;
};
