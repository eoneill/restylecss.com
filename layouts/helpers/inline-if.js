"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("inline-if", function(condition, truthy, falsy) {
    if (typeof falsy === "function") {
      falsy = false;
    }
    return condition ? truthy : falsy;
  });
};
