# modules-path

The `modules-path` module allows to include modules recursively

## Install

Using `npm`:

```
npm install
```

## Example

```js
const ModulesPath = require('@janiscommerce/modules-path');

const modulePath = ModulesPath.get('modules', 'product'); // expected result: 'node/process/path/modules/other/paths/product'

require(modulePath);
```