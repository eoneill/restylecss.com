"use strict";

var fs = require("fs");
var glob = require("glob");
var path = require("path");

module.exports = function(Handlebars) {
  glob.sync("./layouts/partials/**/[^_.]*.hbt").forEach(function(partial) {
    var partialName = path.basename(partial, ".hbt");
    Handlebars.registerPartial(partialName, fs.readFileSync(partial).toString());
  });
};
