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
    themeColor: "#3f3f3f",
    title: "reSTYLE - an eyeglass module",
    description: pkg.description,
    tagline: "TODO",
    styles: ["default.css"],
    copyright: {
      holder: "LinkedIn Corporation",
      year: new Date().getFullYear(),
      website: "http://engineering.linkedin.com"
    },
    feed: ["examples"],
    url: "",
    git: {
      account: "eoneill",
      repo: "eyeglass-restyle"
    },
    package: {
      name: "eyeglass-restyle"
    },
    badges: "//img.shields.io",
    nav: {
      documentation: {
        href: "documentation",
        title: "Docs",
        description: "Read the docs!"
      },
      api: {
        href: "api",
        title: "API",
        description: "API documentation"
      },
      github: {
        href: "https://github.com/{git.account}/{git.repo}",
        title: "GitHub",
        description: "View the source on GitHub",
        target: "_blank"
      },
      examples: {
        href: "examples",
        title: "Examples"
      },
      tutorials: {
        href: "tutorials",
        title: "Tutorials"
      }
    }
  },
  livereload: {
    host: "localhost:35729"
  },
  isProd: false,
  today: Date.now(),

  environments: {
    production: {
      site: {
        url: "//www.restylecss.com"
      },
      isProd: true,
      livereload: false
    },
    staging: {
      site: {
        url: ""
      },
      isProd: true,
      livereload: false
    }
  }
};

if (argv.environment) {
  config = merge(config, (config.environments && config.environments[argv.environment]) || {});
}

config.isDev = !config.isProd;

config.isServer = config.isServer || (argv && argv.server);

if (!config.isServer) {
  config.destination = "./dist";
}

module.exports = merge(config, {
  argv: argv
});
