#Simple Docs

Generates documentation from your JS code.

##Quick Start

```
$ npm install simple-docs
```

`hello.js`

```js
/**
* Says hello
*/
function helloWorld() {
  console.log('Hello world!');
}

var simpleDocs = require('simple-docs');
simpleDocs.generate('hello-world.js');
```

`out/docs.json`

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
