[TypeScript project guide](https://blog.appsignal.com/2022/01/19/how-to-set-up-a-nodejs-project-with-typescript.html)

Steps necessary
* nvm ls
  * See what version of Node we're on
  * Want to use v16 currently
* `yarn init`
  * Go through the basic steps
* `touch tsconfig.json`
  * Add configurations as seen in this project's config file
* `yarn add @tsconfig/node16 --dev`
* `npx tsc`
  * This builds the code from .ts to .js for Node to run
* `yarn add @types/node --dev`
  * Without this we'd have basic errors. This way TypeScript knows Node's types
* node src/dist/sayMyName.js
  * Runs the program transpiled to regular JS
* `yarn add ts-node --dev`
  * This will let us run .ts files directly instead
  * https://github.com/TypeStrong/ts-node#commonjs-vs-native-ecmascript-modules
* `yarn add eslint --dev`
  * (I had it installed globally, actually)
* `yarn create @eslint/config`
  * Create the config file (ask for .js file for config)
  * Skip the step where it asks you to install extra modules
* `yarn add @typescript-eslint/eslint-plugin@latest @typescript-eslint/parser@latest --dev`
* `npx eslint . --fix`
  * To run the linter
