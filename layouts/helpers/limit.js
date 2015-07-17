"use strict";

module.exports = function(Handlebars, config) {
  Handlebars.registerHelper("limit", function(collection, limit, start) {
    var out = [],
        i, c;

    start = start || 0;

    for (i = c = 0; i < collection.length; i++) {
      if (i >= start && c < limit+1) {
        out.push(collection[i]);
        c++;
      }
    }

    return out;
  });
};
