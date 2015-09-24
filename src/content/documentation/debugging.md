---
title: Debugging
topic: Integration
tags: debug, log
layout: default.hbt
date: 2015-09-24
order: 2030
---

## Logging

reSTYLE ships with several built in logging features to help you debug your UI patterns. You can turn them all on by simply enabling the `log` config:

```scss
@import "restyle";

@include restyle-config(log, true);
```

### Granular logging

As you'll quickly notice, turning on all logs can get overwhelming for larger projects. Granular logging allows you to turn on specific logs.

For example, to only see `time` logs, we can do the following:

```scss
@include restyle-config(log, (
  time: true // turns on all `time` logs
));
```

Still too much noise? We can look at the `time:grammar` logs:

```scss
@include restyle-config(log, (
  time: (
    grammar: true // turns on `time` logs related to `grammar`
  )
));
```

#### Granular config

```scss
@include restyle-config(log, (
  define: true,
  time: (
    define: true,
    extend: true,
    grammar: true,
    styles: true,
    styles-from-grammar: true
  )
));
```