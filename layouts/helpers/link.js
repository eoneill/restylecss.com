"use strict";

var rFullyQualifiedUrl = /^(?:https?\:)?\/\//;

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("link", function(path, options) {
    var baseUrl = config.site.url || "";
    var protocol = options.hash.protocol;

    if (protocol) {
      protocol = protocol.replace(/[\:\/]*$/, "://");
      baseUrl = baseUrl.replace(/^(https?\:)?\/\//, protocol);
    }

    path = rFullyQualifiedUrl.test(path) ? path : baseUrl + "/" + (path || "");

    return path.replace(/\{(git|package)\.(repo|account|name)\}/g, function(match, type, key) {
      return config.site[type][key];
    });
  });
};
