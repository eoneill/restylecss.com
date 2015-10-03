---
title: What are UI Patterns?
topic: Getting Started
tags: getting started, patterns
layout: default.hbt
date: 2015-07-20
order: 20
---

## UI Patterns

UI patterns are grammatical abstractions of CSS rules. This allows developers and designers to discuss UI composition in a natural language without jargon.

### Starting simple

Using natural language, we can create and compose visual UI patterns.

Let's start with a simple UI pattern: a **button**.

We all know what a button is, but what does a button look like? Styleguide and design rules will govern a **button**'s _visual representation_ on a per app / per site basis. Whatever this happens to be, this is our pattern.

Once a button UI pattern is defined, you can reuse it, over and over.

Here's a quick example of consuming a **button** pattern in CSS:

```scss
.purchase {
  @include restyle(button);
}
```

This makes your code very easy and intuitive to read and understand. Anyone looking at this code can quickly determine that the `.purchase` element will look like a **button**.

Jump ahead to learn more about [defining UI patterns]({{link "documentation/defining-ui-patterns"}}).

### Adding variants

As your app and UI pattern library evolves, you'll quickly find that one button design can't scale to every use case.

Sometimes you need a **small** button, or a **large** button. Maybe you need **primary** and **secondary** buttons.

Maybe you even need a glaring **call-to-action** button.

reSTYLE makes this easy to scale by simply adding modifiers to what started out as a simple button definition.

Once again, we can compose our UI using verbiage that spans that's intuitive and flexible.

```scss
.purchase {
  @include restyle(large call-to-action button);
}

.download-now {
  @include restyle(small primary button);
}

.accept {
  @include restyle(primary button);
}
.cancel {
  @include restyle(secondary button);
}
```

A UI pattern is as flexible as the language used to describe the pattern itself.

Imagine you have a special use case where you need a **button in a modal** to look a specific way:

```scss
.shopping-cart-modal {
  @include restyle(modal);
  .purchase {
    @include restyle(button in a modal);
  }
}
```

Well that was simple!

Learn more about [modifiers]({{link "documentation/modifiers"}}).

### Stateful patterns

UI patterns can also represent state. Unlike modifiers, states are assumed. The integration doesn't have to ask for specific states. Any states defined in the UI pattern come along for the ride when the developer consumes it, without have to ask for them.

Let's rewind and look at our simple **button** again:

```scss
.purchase {
  @include restyle(button);
}
```

As this is a **button**, we'd probably expect it to have `hover`, `focus`, and `active` states.

It might also have a `disabled` state. Or possibly any other stateful description you might apply: `selected`, `current`, `submitted`.

reSTYLE abstracts this complexity from the developer. Our button pattern definition can easily define all these states and more, without ever having to change the simple `restyle(button)` interface.

Learn more about [states]({{link "documentation/states"}}).

## Up next

Deep dive into how [grammar really works in reSTYLE]({{link "documentation/understanding-grammar"}}).
