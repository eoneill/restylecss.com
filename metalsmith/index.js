var Metalsmith = require("metalsmith");
var Handlebars = require("handlebars");
var path = require("path");

function debug(files, metalsmith, done) {
  console.log("[metalsmith:files]", files);
  console.log("[metalsmith:metalsmith]", metalsmith);
  done();
}

function noop(files, metalsmith, done) {
  done();
}

module.exports = function(rootDir) {
  var config = require("./config");
  var plugins = require("./plugins")(config);

  new Metalsmith(rootDir)
    .metadata(config)
    .use(config.isServer && plugins.watch({
      paths: {
        "${source}/content/**/*.md": true,
        "${source}/**/*.html": true,
        "${source}/{styles,images}/**/*": "**/*",
        "layouts/**/*": "**/*"
      },
      livereload: !!config.livereload
    }) || noop)
    .use(plugins.configureHandlebars(Handlebars, config))
    .use(plugins.filter())
    .use(config.isProd && plugins.drafts() || noop)
    .use(plugins.collections({
      posts: {
        pattern: "content/posts/**/*.md",
        sortBy: "date",
        reverse: true
      },
      tutorials: {
        pattern: "content/tutorials/**/*.md",
        sortBy: "order"
      },
      documentation: {
        pattern: "content/documentation/**/*.md",
        sortBy: "order"
      },
      examples: {
        pattern: "content/examples/**/*.md",
        sortBy: "title",
        reverse: true
      }
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
    .use(plugins.tags({
      handle: "tags",
      //metadataKey: "alltags",
      path: "topics/:tag.html",
      // template to use for tag listing
      template: "topic.hbt"
    }))
    .use(plugins.permalinksInfo())
    .use(plugins.permalinks({
      pattern: ":collection/:permaname",
      relative: false
    }))
    .use(plugins.pagedata(config))
    // use handlebars on content
    .use(plugins.inPlace({
      engine: "handlebars",
      pattern: "**/*.{md,html}"
    }))
    // extract excerpts right before we do the layouts
    .use(plugins.excerpt())
    .use(plugins.fixCollections())
    .use(plugins.collectionTopics())
    .use(plugins.tagdata())
    .use(plugins.aside(config))
    // use handlebars for layout
    .use(plugins.templateToLayout())
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
    .destination(config.destination || "./tmp/restylecss.com")
    .build(function(err) {
      if (err) { throw err; }
    });
}


