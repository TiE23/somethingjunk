# Structure
The hierarchy works like this...
```
              +-2-----------+
              |  Middleware |
              | ZOD Schemas |
              +-------------+
                     ^
+-1------------+     |     +-3-----------+        +-4--------+        +-5---------+
|    Routes    | <---+---> | Controllers | <----> | Services | <----> |   Models  |
| Api Endpoint |           +-------------+        +----------+        | /Database |
+--------------+                                                      +-----------+
```

So, take a look at the files.
1) We define the routes in ./src/routes.ts
2) The post routes have a middleware callback called validateResource
  1) In this middleware we are leveraging zod to check the provided data by using .parse()
  2) Look at the schema files and how we use zod to define their body
  3) If anything is wrong or missing zod will throw an error explaining what was wrong
  4) If it throws, that validate middleware will return a 400 error with detailed error message
3) The controllers get called for these routes. They're often named with the suffix "Handler".
  1) These controllers can do things like create, get, and delete stuff.
  2) Controllers are responsible for properly organizing the incoming API post data
  3) And they then rely on the services to do the heavy lifting
4) The services are the parts that call the functions that interface with the database
  1) For example, when creating a user, it'll run UserModel.create(apiInput) and return to the controller the new user's data
5) The models in this case use mongoose to pretty seamlessly define and immediately use our database
  1) We're defining new tables and stuff just by using them, it's pretty sweet.
  2)

It's also worth mentioning how Schemas fit into this project. They fit into a special part of our middleware.
The project uses ZOD, a node module that let's use define shapes that have rules that we can check to make sure they are followed.

# Running
Run mongoDB with `mongod --config /opt/homebrew/etc/mongod.conf`.
Run server with `yarn dev:debug`.
Debug with "Attach to dev:debug".
