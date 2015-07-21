"use strict";

var merge = require("lodash.merge");

var argv = require("minimist")(process.argv.slice(2), {
  alias: {
    env: "environment",
    serve: "server"
  }
});

var pkg = require("../package.json");
var config = {
  site: {
    themeColor: "#0077b5",
    title: "reSTYLE - an eyeglass module",
    description: "TODO",
    tagline: "TODO",
    styles: ["default.css"],
    copyright: {
      holder: "LinkedIn Corporation",
      year: new Date().getFullYear()
    },
    url: "",
    git: {
      account: "eoneill",
      repo: "eyeglass-restyle"
    },
    package: {
      name: "eyeglass-restyle"
    },
    badges: "//img.shields.io"
  },
  livereload: {
    host: "localhost:35729"
  },
  isProd: false,

  environment: {
    production: {
      site: {
        url: "//www.restylecss.com"
      },
      isProd: true,
      livereload: false
    }
  }
};

if (argv.environment) {
  config = merge(config, (config.environment && config.environment[argv.environment]) || {});
  config.isDev = !config.isProd;
}

module.exports = merge(config, {
  argv: argv
});
