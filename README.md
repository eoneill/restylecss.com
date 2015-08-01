# restylecss.com website

This is the source for [restylecss.com](http://www.restylecss.com), which is a hub for [`eyeglass-restyle`](https://github.com/eoneill/eyeglass-restyle).

## Installation

You know the drill...

```sh
npm install
npm install gulp --global # if you don't already have gulp command line installed
```

## Deploying locally

```sh
gulp serve # will start the dev server
gulp serve:staging # will start the staging server (similar to prod build)
```

## Building

```sh
gulp build
```

## Deploying to the web

```sh
gulp deploy
```

To perform a dry-run deployment (without pushing)...

```sh
gulp deploy:dry
```

## Tests

Currently the tests just validate that `deploy:dry` completes and prints the tree of files staged for deployment.

```sh
gulp test
```
