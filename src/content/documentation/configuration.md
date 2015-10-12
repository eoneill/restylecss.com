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

The configuration interface for reSTYLE is exposed via the `restyle-config` methods.

Below you'll find a list of supported configuration options.

## reSTYLE Options

| config name | description |
| :----------- | :----------- |
| `state-mappings` | The mapping of state identifiers to state selectors. See [States]({{link "documentation/states"}}) and [`restyle-add-state`]({{api "restyle-add-state" type="function"}}). |
| `log` | Enable/disable logging and debug info. See [debugging]({{link "documentation/debugging"}}). |

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

## Temporary config

If you wish to only change the config temporarily, consider using the [`restyle-with-config`][restyle-with-config-mixin]. The mixin takes the same arguments as the `restyle-config` mixin, but only updates the global config for the scope of the mixin.

```scss
@import "restyle";

@include restyle-with-config(...) {
  // do stuff here with the new config
}

// the previous config is restored here
```

## Up next

Now that you've got reSTYLE working and configured, let's find out [why UI patterns are so powerful]({{link "documentation/what-are-ui-patterns"}}).


[restyle-config-function]: {{api "restyle-config" type="function"}}
[restyle-config-mixin]: {{api "restyle-config" type="mixin"}}
[restyle-with-config-mixin]: {{api "restyle-config" type="mixin"}}