---
title: Understanding Grammar
topic: Getting Started
tags: getting started, grammar
layout: default.hbt
date: 2015-09-24
order: 30
---

## Grammar

As [discussed previously]({{link "documentation/what-are-ui-patterns"}}), reSTYLE UI patterns are built around a concept of natural language. This natural language is converted into the _grammar_ that describes the UI pattern.

For example, you might have a `button` definition, as well as a variant like a `small primary button`.

This is the basis for our grammar.

## Parsing Grammar

reSTYLE has a built-in grammar engine that parses the natural language sentence in a grammar representation.

The first phase of grammar parsing is to understand _what_ we're talking about. This is known as the `type`.

In our example of a `small primary button`, we can determine that the thing we're talking about is the `button`. So we say the `type` is `button`.

The rest of the sentence is known as the `description`. So in this case, our `description` is `small primary`.

The internal representation of this is:

```js
{
  type: "button",
  description: ["small", "primary"]
}
```

### Type

The type is determined as the first word that matches a UI definition identifier. So in this case, `restyle-define(button, ...)` let's us know that `button` is a thing that we can talk about. The grammar engine doesn't recognize `small` or `primary` as a valid type, but it recognizes `button`, so we've determined our type to be a `button`.

### Description

The rest of the sentence is put into the description. The description then goes through a second phase of parsing.

#### Ignored words

The first thing we do on the description is to remove words that don't have any real meaning. This list of words includes: `a`, `also`, `an`, `and`, `is`, `it`, `or`, `that`, `the`, `this`, `was`

These words are discarded from the description.

#### Contextual words

The next step is to parse all of the contextual cues within the sentence. Contextual cues include `in` and `within`. For example, `button in a dialog`.

When a contextual cue is encountered, we rewrite the description to make sense.

For example, if we had a `button in a large dialog`, we have to identify that `large` applies to the `dialog` rather than to the `button`. This is a context shift.

###### `in` vs `within`

When the `in` contextual cue is used, it signifies that the element must be a direct descendent of the context. That is, `button in a dialog`, the `button` must be a direct descendant of `dialog`.

However, the `within` cue applies an any descendent. That is, `button within a dialog` will be valid if any of the ancestors of `button` are a `dialog`.

#### Placement words

Finally, we handle a few words that change the _placement_ or attribution. These words include: `on`, `with`, `without`.

For example `button with a shadow`.

<!--
TODO
### Adding custom grammar engines

While the built-in grammar parser is quite robust, you may have a specific need to extend it. Here's a quick example of doing just that:
-->
