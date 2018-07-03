# ps-app-module-tempalte
This is a module template for jsx-scripts that can be executed in Adobe applications (particularly Photoshop).
***Warning! This is not for CEP Extensions.***
Template for jsx-scripts can be found [here](https://github.com/EugenTepin/ps-app-tempalte).

# Concept

### Use NPM as a module system. 

  All modules should use ```require``` to include other modules, and use ```module.exports``` to export it content.
  Main entry point of module is index.js. Additional entry point test.js for test bundles.

### Use [Browserify](http://browserify.org/) as a bundle system.

  * combines all required code in one bundle (easy to install/update)
  * has watch mode (bundle rebuilds automatically)

# Template structure

* **build**. This folder will contain test_bundle.jsx and {your_module_name_from_package.json}.jsx
* **utils**. Contains npm scripts.
* **index.js**. Module entry point.
* **header.jsx**. Basically, it is mustache template wich gets data from package.json. This file will be prepended to bundle from index.js entry point
* **package.json**. 
* **README.md**.
* **test.js**. Test entry point.

# Workflow

1) Get files


2) Fill in package.json, ```name``` and ```version``` is mandatory.

3) Fill in header.jsx.

4) ```npm run watch``` Updates files automatically on change.

5) Write your module code in __index.js__ and tests in __test.js__.

6) open __test_build.jsx__ in ESTK (Adobe ExtendScript Toolkit) run in your target Adobe app, then debug.

7) Repeat from 5 to 7 until done.

8) Prepare package for npm publish.

# Usage

* As a module for scripts that uses [this](https://github.com/EugenTepin/ps-app-tempalte) template:

```javascript
var your_module = require('your_module_name_from_package.json');
```
* As a module for scripts that uses ```#include```:

```javascript
#include "{path_to_bundle}/{your_module_name_from_package.json}.jsx"
var your_module = require('your_module_name_from_package.json');
```