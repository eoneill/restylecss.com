---
title: Configuration
topic: Getting Started
tags: getting started, configuration, restyle-config
layout: default.hbt
date: 2015-07-20
order: 10
---

## Configuration

reSTYLE uses a configuration interface to enable certain features and modify internal behavior.

The configuration interface for reSTYLE is exposed via the `restyle-config` method.

Below you'll find a list of supported configuration options.

## reSTYLE Options

| config name | description |
| :----------- | :----------- |
| `state-mappings` | The mapping of state identifiers to state selectors. See <!--TODO[States]({{link "documentation/states"}}) and--> [`restyle-add-state`]({{link "api/#function-restyle-add-state"}}). |


## `restyle-config`

reSTYLE exposes two methods for interacting with configuration options.

#### mixin

The first is a mixin named [`restyle-config`][restyle-config-mixin]. This mixin can be used to set configuration values:

```scss
@import "restyle";

@include restyle-config(/* config goes here */);
```

This mixin can either take a single config key with a value, or a `map` of values:

```scss
@import "restyle";

// set a single key-value
@include restyle-config(my-option, my-value);

// OR

// set multiple key-values at once using a map
@include restyle-config((
  option1: value1,
  option2: value2
));
```

[`restyle-config`][restyle-config-mixin] will correctly merge these values into the master config.


#### function

The [`restyle-config`][restyle-config-function] function is similar to the mixin version, but it can also be used to get a config value.

First, we'll take a look at the familiar setter method.

```scss
@import "restyle";

// set a single key-value
$config: restyle-config(my-option, my-value);

// OR

// set multiple key-values at once using a map
$config: restyle-config((
  option1: value1,
  option2: value2
));
```

Now, let's look at the getter method.

```scss
@import "restyle";

// get the entire global config as a map
$config: restyle-config();

// or get an individual config value
$my-config-option: restyle-config(my-option);
```



[restyle-config-function]: {{link "api/#function-restyle-config"}}
[restyle-config-mixin]: {{link "api/#mixin-restyle-config"}}
