"use strict";

var fs = require("fs");
var merge = require("lodash.merge");
var camelCase = require("camelcase");
var plugins = require("load-metalsmith-plugins")();
var glob = require("glob");
var path = require("path");

module.exports = function(config) {
  function noop(opts) {
    return function(files, metalsmith, done) {
      done();
    }
  }

  glob.sync(path.join(__dirname, "/plugins/**/[^_.]*.js")).forEach(function(plugin) {
    var pluginName = camelCase(path.basename(plugin, ".js"));
    plugins[pluginName] = require(path.resolve(plugin));
  });

  // if it's not server mode...
  if (!config.argv.server) {
    // disable the server/watcher
    plugins.serve = noop;
    plugins.watch = noop;
  }

  // if it's not prod mode
  if (!config.isProd) {
    // disable minifiers
    plugins.htmlMinifier = noop;
    plugins.uglify = noop;
    // allow drafts in dev mode
    plugins.drafts = noop;
  }

  //console.log("metalsmith plugins available:", Object.keys(plugins));

  return plugins;
};
