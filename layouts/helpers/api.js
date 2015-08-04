"use strict";

// generates a link to a method in the API docs
module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("api", function(name, options) {
    var baseUrl = config.site.url || "";
    var type = options.hash.type || "mixin";

    var path = baseUrl + "/api";
    if (name) {
      path += "#" + type + "-" + name;
    }
    return path;
  });
};
