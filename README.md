# Module Provider

This plugin simply adds imports to the top of all of your files so you can spend more time writing the code that matters.

## Examples

#### Default imports:

.babelrc :
```json
{
  "presets": ["es2015"],
  "plugins": [
    ["module-provider", {
      "@cycle/core": "Cycle",
      "@cycle/dom": "CycleDOM"
    }]
  ]
}
```
This configuration will put this at the top of your files
```js
import Cycle from "@cycle/core";
import CycleDOM from "@cycle/dom";
```

#### Non-default imports:

.babelrc :
```json
{
  "presets": ["es2015"],
  "plugins": [
    ["module-provider", {
      "@cycle/dom": ["div", "h2", "h4"]
    }]
  ]
}
```
This configuration will place this at the top of your files
```js
import {div, h2, h4} from "@cycle/dom"
```
