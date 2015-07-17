"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("inline-if", function(condition, truthy, falsy) {
    return condition ? truthy : falsy;
  });
};
