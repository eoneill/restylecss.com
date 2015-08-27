---
title: Modifiers
topic: Defining Patterns
tags: restyle, modifiers, special properties
layout: default.hbt
date: 2015-08-14
draft: false
order: 1020
---

## Introduction

When you create a UI pattern with reSTYLE, you usually start with a set of
default styles.

```scss
@include restyle-define(button, (
  background-color: #4787ed,
  border: 1px solid #3079ed,
  border-radius: 2px,
  color: #fff,
  display: inline-block,
  font-weight: bold,
  padding: 5px 10px,
  text-align: center,
  vertical-align: middle
));
```

This gets your pattern off to a good start, but you'll soon want to customize
the pattern for various use cases. This is where reSTYLE modifiers come in. A
**Modifier** is a word or short phrase that you specify along with your pattern
when you include `restyle()`.

```scss
.primary-btn {
  @include restyle(primary button);
}
```

In the example above, `primary` is a modifier for the `button` pattern. This
will allow you to add to and override the default styles for a `button` that
will take effect when `primary` is specified.

Modifiers enable you to create variants of a pattern to specialize it for
particular use cases (e.g. size, importance). Additionally, as we'll see soon,
certain modifier forms known as **Context Modifiers** allow you to customize
your pattern based on the context it's used in (e.g. dialog, sidebar).

Finally, modifiers provide your patterns a great deal of composability,
empowering you to produce even more variations by combining existing ones.

## Variant Modifiers

A **Variant Modifier** refers to a modifier that creates a new variant of a
pattern. It might be for a size, a level of importance, or a visual style.

A modifier can precede a pattern name or it can come after. Preceding modifiers
are usually single words (e.g. `small`) and commonly adjectives. Trailing
modifiers are usually short phrases (e.g. `with a tooltip`, `without a title`)
and are often used to express an association with another UI pattern or a
particular state of the element the pattern is applied to.

When defining a pattern, you list its modifiers under the key
`restyle-modifiers`.

```scss
@include restyle-define(button, (
  // ...default styles...

  restyle-modifiers: (
    small: (
      font-size: 90%,
      font-weight: normal,
      padding: 3px 7px
    ),
    'with a tooltip': (
      position: relative
    )
  )
));
```

Then the modifiers will be available when invoking `restyle()`.

```scss
.like-btn {
  @include restyle(small button);
}

.contact-btn {
  @include restyle(button with a tooltip);
}
```

## Context Modifiers

As mentioned, there are a couple modifier forms that create context modifiers
and are used to style a pattern based on the *context* (i.e. the containing UI
element) of the element to which it is applied. Specifically, reSTYLE recognizes
trailing modifiers beginning with `in` or `within` as context modifiers.
Conventionally, `in` is used when referring to a direct parent and `within` is
used when referring to an ancestor.

```scss
@include restyle-define(button, (
  // ...default styles...

  restyle-modifiers: (
    // ...
    'in an alert': (
      display: block
    ),
    'within a toolbar': (
      margin-right: 15px
    )
  )
));
```

Note that a context modifier not only specifies the context for which you're
specializing your pattern, but also changes the pattern to which additional
modifiers will apply. Consider this `restyle()` invocation:

```scss
@include restyle(small button in a modal dialog with a header);
```

The `small` modifier will apply to `button`, while `modal` and `with a header`
will apply to `dialog`. This is because `in a...` has changed the modifier
target to `dialog`. Now you can target a very specific variant of a `dialog` in
your `button` styles if you need to.

```scss
@include restyle-define(button, (
  // ...default styles...

  restyle-modifiers: (
    small: (
      // ...
    ),
    // ...
    'in a modal dialog with a header': (
      display: block
    )
  )
));
```

Additionally, reSTYLE is flexible enough to match a more generic context
modifier from your pattern definition if you don't provide one as specific as
what was requested. So our example of `in a modal dialog with a header` in the
`restyle()` include call could also match `in a modal dialog` or just `in a
dialog` from a pattern definition.

If you provide multiple modifier definitions that match a context modifier,
reSTYLE will merge their styles, with the last definition defined taking
precedence when multiple definitions define the same property.

```scss
@include restyle-define(button, (
  // ...default styles...

  restyle-modifiers: (
    // All of these will match for 'in a modal dialog with a header'
    'in a dialog': (
      // ...
      color: #000
    ),
    'in a modal dialog': (
      // ...
      color: #fff
    ),
    'in a modal dialog with a header': (
      // ...
      color: #333 // This `color` wins.
    )
  )
));
```

## Composability

You can compose modifiers in your `restyle()` calls to produce more pattern
style variations. Composition of variant modifiers works the same way as it does
with context modifiers. Let's say you have a modifier definition for `primary
button` and one for `small button`. You can ask `restyle()` for a `small primary
button` when invoking your `button` pattern. You can think of `small primary` as
a **Compound Modifier**.

If you don't provide a modifier definition for `small primary` but do define
`small` and `primary` separately, reSTYLE will figure out the styles for you by
merging the two style definitions in a top-down, last definition taking
precedence approach.

```scss
@include restyle-define(button, (
  // ...default styles...

  restyle-modifiers: (
    small: (
      font-size: 90%,
      font-weight: normal,
      padding: 3px 7px
    ),
    primary: (
      background-color: #0033cc,
      border-color: #0033cc,
      color: #fff,
      font-weight: bold
    )
  )
));
```

You can also define styles to be applied for a specific compound modifier.

```scss
@include restyle-define(button, (
  // ...default styles...

  restyle-modifiers: (
    small: (
      // ...
    ),
    primary: (
      // ...
    ),
    'small primary': (
      font-size: 95%
    )
  )
));
```

Between compound modifiers and context modifiers, reSTYLE empowers you to
compose your UI patterns using flexible language and to compose larger patterns
out of smaller ones through specializing component patterns for specific
contexts.

<!--
TODO: Uncomment when states page is ready.
## Up Next

Learn about [reSTYLE states]({{link "documentation/states"}}).
-->
