"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("not", function(value) {
    return !value;
  });
};
