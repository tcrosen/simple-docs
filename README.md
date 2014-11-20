#Simple Docs

Generates documentation from your JS code.

##Quick Start

```
$ npm install simple-docs
```

```js
/**
* Says hello
*/
function helloWorld() {
  console.log('Hello world!');
}

var simpleDocs = require('simple-docs');

simpleDocs.generate('./src/*.js');
```

```json
[
  [
    {
      "tags": [],
      "line": 1,
      "description": "Says hello"
    }
  ]
]
```
