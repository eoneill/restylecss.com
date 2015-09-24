---
title: No Conflict Mode
topic: Integration
tags: noconflict
layout: default.hbt
date: 2015-09-24
order: 2000
permaname: noconflict
---

## Avoiding Sass Conflicts

Sass variables, mixins, and functions are all defined in the global scope. reSTYLE tries to be a good citizen and only expose what it needs, but those are still global.

reSTYLE utilizes a naming convention that helps avoid conflicts by default, but even so, there may still be conflicts.

If you run into such conflicts, you can use the `noconflict` mode.

```scss
@import "restyle/noconflict";
```

You'll find that the conveniently named functions / mixins are no longer available. Instead of using the convenience methods, you'll have to use the verbosely named methods.

For example, instead of using `restyle-define`, you'd use `-restyle--define`.

You'll have to do some digging through the [API]({{link "api"}}) docs to discover all of these methods.
