var Metalsmith = require("metalsmith");
var Handlebars = require("handlebars");
var path = require("path");

function debug(files, metalsmith, done) {
  console.log("[metalsmith]", files);
  done();
}

function noop(files, metalsmith, done) {
  done();
}

module.exports = function(rootDir) {
  var config = require("./config");
  var plugins = require("./plugins")(config);
  var helpers = require("./helpers")(Handlebars, config);
  var partials = require("./partials")(Handlebars);

  new Metalsmith(rootDir)
    .metadata(config)
    .use(plugins.filter())
    .use(config.isProd && plugins.drafts() || noop)
    .use(config.isServer && plugins.watch({
      paths: {
        // TODO - this isn't really working right, need to adjust the patterns
        "${source}/**/*": true,
        "${source}/styles/**/*": "**/*",
        "layouts/**/*": "**/*",
      },
      livereload: !!config.livereload
    }) || noop)
    .use(plugins.collections({
      posts: {
        pattern: "content/posts/*.md",
        sortBy: "date",
        reverse: true
      },
      tutorials: {
        pattern: "content/tutorials/*.md",
        sortBy: "weight"
      },
      documentation: {
        pattern: "content/documentation/*.md",
        sortBy: "weight"
      },
      examples: {
        pattern: "content/examples/*.md",
        sortBy: "title"
      }
    }))
    .use(plugins.paginate({
      perPage: 10,
      path: ":collection/page"
    }))
    .use(plugins.markdown({
      gfm: true,
      tables: true,
      smartLists: true,
      smartypants: true,
      highlight: function (code, lang, callback) {
        return require("highlight.js").highlightAuto(code).value;
      }
    }))
    .use(plugins.permalinksInfo())
    .use(plugins.permalinks({
      pattern: ":collection/:permaname",
      relative: false
    }))
    .use(plugins.pagedata(config))
    .use(plugins.aside(config))
    // use handlebars on content
    .use(plugins.inPlace({
      engine: "handlebars",
      pattern: "**/*.{md,html}"
    }))
    // extract excerpts right before we do the layouts
    .use(plugins.excerpt())
    // use handlebars templates
    .use(plugins.layouts({
      engine: "handlebars"
    }))
    .use(plugins.eyeglass({
      outputStyle: config.isProd ? "compressed" : "expanded",
      root: rootDir,
      buildDir: "${source}/assets/",
      assetsHttpPrefix: "assets"
    }))
    .use(plugins.autoprefixer())
    .use(config.isProd && plugins.htmlMinifier() || noop)
    .use(config.isProd && plugins.uglify() || noop)
    .use(config.isServer && plugins.serve() || noop)
    .destination(config.destination || "./restylecss.com")
    .build(function(err) {
      if (err) { throw err; }
    });
}


