---
title: Property References
topic: Defining Patterns
tags: restyle, referencing, this, root, parent, special properties
layout: default.hbt
date: 2015-09-24
order: 1040
---

## Introduction

Now that you've gotten the hang of defining UI patterns, let's jump into some of the more advanced features of working with a pattern definition. In this section, we're going to discuss _property references_, or the ability to reference another property value within the definition.

## Getting to know `this()`

Let's start off with the simplest case. We have a definition with a `color` property on it, and we want to reference this in another property (let's say `border-color`).

This is as simple as using special `this()` method:

```scss
@include restyle-define(button, (
  color: blue,
  border-color: this(color)
));
```

At the time the definition is evaluated, the value for `border-color` will resolve to `blue`, by referencing the `color` property.

This is pretty useful, but it gets even more powerful when you apply it across modifiers.

Let's take a look at a slightly more complex example:

```scss
@include restyle-define(button, (
  color: blue,
  border-color: this(color),
  restyle-modifier(secondary): (
    color: gray
  )
));

.btn {
  @include restyle(button);
  &.secondary {
    @include restyle(secondary button);
  }
}
```

Can you guess what this will output? If you guessed the following, you were right!

```scss
.btn {
  color: blue;
  border-color: blue;
}
.btn.secondary {
  color: gray;
  border-color: gray;
}
```

Even though the `secondary` modifier never changed the `border-color` value, it updates automatically because it's a value is linked to `color`. If `color` changes, so does `border-color`.

## `this`, `root`, and `parent`

`this(...)` can reference any property within the current context. We saw above that we can reference a property across modifiers, but what happens when you introduce a new selector (or state) context?

```scss
@include restyle-define(button, (
  color: blue,
  '.foo': (
    border-color: this(color)
  )
));
```
This will throw an error that it can't resolve the value for `this(color)`. So what's going on here?

reSTYLE helpfully creates a new selector context here, so the properties of the parent do not leak into the child selector context.

Let's expand on this example a bit:

```scss
@include restyle-define(button, (
  color: blue,
  '.foo': (
    color: this(color),
    border-color: this(color)
  )
));
```

Make more sense why the previous example would throw an exception? This will also throw an exception that `this(color)` cannot be resolved. In this case, we get into an infinite loop where `color` within `.foo` can never resolve because it is referencing itself.

This is where `root()` and `parent()` come in.

### `root`

`root` will reference a property on the top most selector context.

```scss
@include restyle-define(button, (
  color: blue,
  '.foo': (
    color: root(color), // get the color value from the root color
    border-color: this(color)
  )
));
```

This works now! The `color` local to `.foo` now resolves to the root `color` (`blue`). `border-color`'s reference to `this(color)` now resolves to the `color` local to `.foo`.

### `parent`

`parent` is similiar, but it explicitly looks in the parent selector context. In this case, `parent` and `root` can be used interchangeably, because `root` is also the `parent`.

But if you had multiple parent contexts, you could target a specific property from one of them:

```scss
@include restyle-define(button, (
  color: blue,
  '.foo': (
    color: red,
    '.bar': (
      color: parent(color) // red
    )
  )
));
```
You can also chain `parent()` lookups:

```scss
@include restyle-define(button, (
  color: blue,
  '.foo': (
    color: red,
    '.bar': (
      color: parent(parent(color)) // blue
    )
  )
));
```

<!--
## Up next - variables

Property references are pretty slick, but just wait until you check out [variables]({{link "documentation/restyle-variables"}}).
-->