# Modules Path
[![Build Status](https://travis-ci.org/janis-commerce/modules-path.svg?branch=master)](https://travis-ci.org/janis-commerce/modules-path)
[![Coverage Status](https://coveralls.io/repos/github/janis-commerce/modules-path/badge.svg?branch=master)](https://coveralls.io/github/janis-commerce/modules-path?branch=master)

The `modules-path` module allows to include modules recursively.

## Installation

```
npm install @janiscommerce/modules-path
```

## Example

```js
const ModulesPath = require('@janiscommerce/modules-path');

const modulePath = ModulesPath.get('modules', 'product'); // expected result: 'node/process/path/modules/other/paths/product'

require(modulePath);
```