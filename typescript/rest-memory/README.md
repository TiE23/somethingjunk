# Notes
I'm using Node 16.13.0

# Initializing Steps
## Part 1 - Basic
1) Write a .gitignore
2) Initialize project with `yarn init` (set entry point to "src/app.ts")
3) Install dependencies:
  * `yarn add bcrypt config cors dayjs express jsonwebtoken lodash mongoose nanoid pino pino-pretty zod`
  * `yarn add --dev @types/bcrypt @types/body-parser @types/config @types/cors @types/express @types/jest @types/jsonwebtoken @types/lodash @types/nanoid @types/node @types/pino @types/supertest @typescript-eslint/eslint-plugin @typescript-eslint/parser @eslint/create-config eslint jest mongodb-memory-server supertest ts-jest ts-node-dev typescript`
4) Initialize TypeScript with `yarn tsc --init`
5) Initialize eslint with `yarn eslint --init` and select good options.
  * In truth I included my own linting rules I prefer.
6) Define new scripts to run:
```
"scripts": {
  "dev": "ts-node-dev --respawn --transpile-only src/app.ts",
  "dev:debug": "ts-node-dev --respawn --transpile-only --inspect=9229 src/app.ts",
  "test": "jest",
  "testWatch": "jest --watchAll --detectOpenHandles",
  "testWatch:debug": "ts-node-dev --transpile-only --inspect=9230 jest --watchAll --detectOpenHandles"
}
```
7) Define .vscode/launch.json:
```
{
  "configurations": [
    {
      "name": "Attach to dev:debug (w/ restart)",
      "port": 9229,
      "request": "attach",
      "skipFiles": [
        "<node_internals>/**",
        "node_modules/**"
      ],
      "type": "node",
      "cwd": "${workspaceFolder}",
      "restart": true
    },

    {
      "name": "Jest Watch Debug",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand",
        "--config",
        "${workspaceRoot}/jest.config.js",
        "--coverage",
        "false",
        "--watchAll",
        "--detectOpenHandles"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen"
    }
  ]
}
```
  * Currently there are some issues with debug running Jest tests. Breakpoints might be unbounded.
8) Run `yarn ts-jest config:init` and update the Jest config file `./jest.config.js`:
```
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {  // eslint-disable-line no-undef
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/**/*.test.ts"],
  verbose: true,
  forceExit: true,  // Doesn't let hanging handles prevent jest from exiting.
  // Remember to restart jest watch if you make a change to the following...
  clearMocks: true,
  resetMocks: true,
  restoreMocks: true,
};
```
9) Define ./src/app.ts and have it say "Hello World!"
  * Be sure to toss in some TS syntax to be sure that everything is configured right.
10) Run `yarn ts-node ./src/app.ts` to be sure things are running OK!

### References and Resources
* [yarn init reference](https://yarnpkg.com/cli/init)
* [tsconfig.json reference](https://www.typescriptlang.org/docs/handbook/tsconfig-json.html)
* [eslint getting started](https://eslint.org/docs/user-guide/getting-started)
* [ts-node-dev usage](https://github.com/wclr/ts-node-dev#usage)
* [VSCode Debugging](https://code.visualstudio.com/docs/editor/debugging)
* [jest getting started](https://jestjs.io/docs/getting-started)

## Part 2 - API
1) ...

# Structure
The hierarchy works like this...
```
              +-2-----------+
              |  Middleware |
              | ZOD Schemas |
              +-------------+
                     ^
+-1------------+     |     +-3-----------+        +-4--------+        +-5---------+        +-6-------+
|    Routes    | <---+---> | Controllers | <----> | Services | <----> |   Models  | <----> | MongoDB |
| API Endpoint |           +-------------+        +----------+        +-----------+        +---------+
|    Express   |
+--------------+
```

So, take a look at the files.
1) We define the routes in ./src/routes.ts
  * This is the realm of Express.js
2) The post routes have a middleware callback called validateResource
  * In this middleware we are leveraging zod to check the provided data by using .parse()
  * Look at the schema files and how we use zod to define their body
  * If anything is wrong or missing zod will throw an error explaining what was wrong
  * If it throws, that validate middleware will return a 400 error with detailed error message
3) The controllers get called for these routes. They're often named with the suffix "Handler".
  *) These controllers can do things like create, get, and delete stuff.
  *) Controllers are responsible for properly organizing the incoming API post data
  *) And they then rely on the services to do the heavy lifting
4) The services are the parts that call the functions that interface with the database
  * For example, when creating a user, it'll run UserModel.create(apiInput) and return to the controller the new user's data
5) The models in this case use mongoose to pretty seamlessly define and immediately use our database
  * We're defining new tables and stuff just by using them, it's pretty sweet.
6) MongoDB runs as a program on our computer with very little configuration or setup.

It's also worth mentioning how Schemas fit into this project. They fit into a special part of our middleware.
The project uses ZOD, a node module that let's use define shapes that have rules that we can check to make sure they are followed.