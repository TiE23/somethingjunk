https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/
After installing MongoDB using Brew it gave me these notes:

To start mongodb/brew/mongodb-community now and restart at login:
  brew services start mongodb/brew/mongodb-community
Or, if you don't want/need a background service you can just run:
  mongod --config /opt/homebrew/etc/mongod.conf