---
title: States
topic: Defining Patterns
tags: restyle, states, special properties
layout: default.hbt
date: 2015-09-24
order: 1030
---

## States

State definitions allow you to express unique variations of UI patterns based on the element's current status. Examples of states include `hover`, `focus`, `disabled`, and any other _stateful_ descriptor.

You can easily add states to a UI pattern using the `restyle-states` or `restyle-state` keywords.

```scss
@include restyle-define(button, (
  restyle-states: (
    hover: (
      color: ...
    ),
    focus: ( ... )
  )
));

// OR

@include restyle-define(button, (
  restyle-state(hover): (
    color: ...
  ),
  restyle-state(focus): ( ... )
));
```

When the UI pattern is invoked, these states will get output into the CSS as selectors.

## Not just selectors

We previously talked about [nesting selectors]({{link "documentation/nesting-selectors"}}) in a definition, and you might be wondering why you wouldn't just use those.

```scss
@include restyle-define(button, (
  '&:hover': ( ... ),
  '&:focus': ( ... )
));
```
That would work.

But, wait, states are a bit different.

Selectors are intended to represent specific hierarchical DOM order, while states represent that state of the element.

That is, the element's `hover` state will not contain a `.hover` child.

This is important because the representation of states is highly dependent on the app architecture (e.g. framework) being used to attribute the state.

For example, you might use `jQuery` to add a `.hover` class to an element that doesn't normally support the `:hover` state. Or maybe your app uses the convention of `.is-hovered`

In this case, a selector would introduce a coupling between the application and your pattern library.

In reSTYLE, we work around this limitation by providing state _identifiers_ and a way for the application owner to declare how to map the identifier to a selector that's compatible with the application architecture.

So in our definition, we only ever refer to the state identifiers (`hover`, `focus`, etc).

### Mapping state identifiers

As an application owner, you will ultimately be responsible for making sure the state identifiers are mapped to appropriate selectors.

This is done using the `restyle-add-state` method:

```scss
@include restyle-add-state(hover, '&:hover, .is-hovered');
@include restyle-add-state(focus, '&:focus, .is-focused');

// OR

@include restyle-add-state((
  hover: '&:hover, .is-hovered',
  focus: '&:focus, .is-focused'
));
```

You can also define these mappings via the `restyle-config` method:

```scss
@include restyle-config(state-mappings, (
  hover: '&:hover, .is-hovered',
  focus: '&:focus, .is-focused'
));
```

## States aren't modifiers

It's also important to understand that states are _not_ modifiers. Modifiers describe a concrete variation of the UI pattern. For example, a `small button`. With modifiers, the user must specifically request the modified variant. That is, they won't get a `small button` simply by asking for a `button`.

With states however, like selectors, come along with the request without the user asking for them. If a `button` has a `hover` state, the user will get it when asking for a `button`.

Here's a quick example to help demonstrate this.

```scss
@incude restyle-define(button, (
  color: blue,
  restyle-modifier(small): (
    font-size: 75%
  ),
  restyle-state(hover): (
    color: green
  )
));

.btn {
  @include restyle(button);
  &.small {
    @include restyle(small button);
  }
}
```

will output...

```css
.btn {
  color: blue;
}
.btn:hover {
  color: green;
}

.btn.small {
  color: blue;
  font-size: 75%;
}
.btn.small:hover {
  color: green;
}
```
