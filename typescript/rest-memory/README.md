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
* [HTTP Status Codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)

## Part 2 - API Initialization
1) Under root create directory `config`. Under `src` create directories `controller`, `middleware`, `model`, `schema`, `service`, `utils`, and `__tests__`.
2) Define `./config/default.ts` and export an object with the API port we want to use as "port".
3) Define a new file `./routes.ts` (`export default function routes(app: Express) {}`).
  * Define routes for the app in there.
  * We can start with a basic healthcheck at "/" that returns a 200.
4) Define a new directory `./utils`.
5) Create a logger in `./utils/logger.ts`
  * To better support jest functionality in the future be sure to turn logging off when under test or the pretty-print functionality will mildly conflict.
6) Not knowing how deep we'll be going in our demonstration project add a MongoDB connection using mongoose in `./utils/connect.js`.
  * Use the config library and `./config/default.ts` to set the MongoDB URI as "mongodb://localhost:27017/rest-memory"
    * That prefix is necessary
    * 27017 is the default port (see notes below on how to launch MongoDB)
    * The name of the endpoint determines the database title, so be sure it's something new

### References and Resources
* [Express.js Hello World](https://expressjs.com/en/starter/hello-world.html)
* [Express.js Basic Routing](https://expressjs.com/en/starter/basic-routing.html)
* [Pino Logger Usage](https://getpino.io/#/?id=usage)
* [Pino-HTTP Example](https://getpino.io/#/docs/web?id=pino-with-express)

## Part 3 - Capitalize API
1) Create `./middleware/validateResource.ts`
  * Define a curry function that takes AnyZodObject and returns a function that...
  * takes the req, res, and next arguments of Express middleware
  * Run the schema's parse function in a try/catch and if anything throws return a 400 and any error messages it generates. Otherwise return `next()`
2) Create `./schema/capitalize.schema.ts` to define the zod objects that we'll use to define the body and param shapes.
  * To use enums make sure to define string enums and use zod's nativeEnum type
  * Since we're supporting both POST and GET format APIs here we can define two different schemas that share the same field data between them
  * Use zod's Typeof generic type to generate exported types
3) Create `./model/caseChange.model.ts`
  * Define an interface for the CaseChangeInput and the CaseChangeOutput
    * Input includes `input: string` and `mode: ModeEnum` (from caseChange.schema.ts)
    * Output includes `output: string`
  * Define an interface for the CaseChangeDocument as being extensions of the previous two with two additions
    * `createdAt: Date` and `updatedAt: Date`
  * Generate the schema with `new mongoose.Schema({...})` and define the input, output, and mode
    * mode will be defined as a string with the enum property defined
      * The enum property takes an array of strings, which you can get easily with `Object.values(ModeEnum)`
    * Add `timestamps: true` to the second argument of `mongoose.Schema()`
  * Export the CaseChangeModel with `mongoose.model<CaseChangeDocument>("CaseChange", caseChangeSchema)`
4) Add the validation function to the middleware of the route `"/api/casechange/:mode"`and `"/api/casechange/:mode/:input"`
5) Create `./controller/caseChange.controller.ts`
  * Define two handler functions for the POST and GET routes
    * `caseChangePostHandler()`
    * `caseChangeGetHandler()`
  * Define the request types as generic variations of Express' Request type
    * First is params
    * Third is body
  * Define the controller's handling code inside try/catch statements to catch any throws and report the issues that come up
  * Add these two new functions to the routes as the final function
6) Create `./utils/caseChange.ts`
  * Define a basic function that'll return the input string with `.toUpper()` or `.toLower()`
  * Use the String Enum defined in `capitalize.schema.ts` to control the behavior
7) Create `./service/caseChange.service.ts`
  * This is the part where our controller uses functions defined here to actually write changes to the database
  * Write caseChangeSave() function that takes the input, output, and mode that'll be written to the database and then write it to the database
  * Return the values that the database generates
8) Test the new APIs in Postman
  * Define the variable for the endpoint (should be localhost:1330)
  * Define a GET request to {{endpoint}}/api/casechange/upper/Hello
  * Define a POST request to {{endpoint}}/api/casechange/upper
    * Define the body as a JSON string (ex: `{"input": "Hello world!"})
      * Make sure in Postman you specify the body as JSON format or it plain won't work

### References and Resources
* [Mongoose JS Docs](https://mongoosejs.com/docs/guide.html)
* [Zod Documentation](https://github.com/colinhacks/zod#basic-usage)
  * [.parse()](https://github.com/colinhacks/zod#parse)
  * [nativeEnum()](https://github.com/colinhacks/zod#native-enums)

## Part 4 - Testing
1) Duplicate `./config/default.ts` to `./config/test.ts`
2) Create `./__tests__/caseChange.test.ts`
  * Import supertest, MongoMemoryServer, and mongoose

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

# Running
Run mongoDB with `mongod --config /opt/homebrew/etc/mongod.conf`.
Run server with `yarn dev:debug`.
Debug with "Attach to dev:debug".