"use strict";

module.exports = function(files) {
  return function findPageBy(key, value) {
    var data;
    if (value) {
      Object.keys(files).some(function(file) {
        if (files[file][key] === value) {
          data = files[file];
          return true;
        }
      });
    }
    return data;
  };
};
