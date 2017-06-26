const mongodb = require('mongodb'),
      MongoClient = mongodb.MongoClient,
      config = require('../config/main');

// const user = 'thekholm80VotingApp';
// const pass = 'thekholm80VotingAppFCCProject';
// const dbUrl = `mongodb://${ user }:${ pass }@ds125262.mlab.com:25262/voting`;

const mongo = {
  processUser: function (user, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('users');

      collection.find({ user: user })
                .toArray( (error, documents) => {
                  if (error) throw error;

                  db.close();
                  if (documents.length > 0) {
                    return this.getUserPolls(user, callback);
                  } else {
                    this.addUser(user);
                    return null;
                }
        });
    });
  },

  addUser: function (user, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('users');

      collection.insert({
        "user": user,
        "polls": []
      }).then( () => {
        this.findUser(user, callback);
      });
    });
  },

  getUserVotes: function (user, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('users');

      collection.find(
        { "user": user },
        { "polls": 1, "_id": 0 }
      ).toArray( (error, documents) => {
        if (error) throw error;

        db.close();
        callback(documents[0]);
      });
    });
  },

  getUserPolls: function (user, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('polls');

      collection.find(
        { "user": user },
        { "_id": 1, "poll.title": 1 }
      ).toArray( (error, documents) => {
        if (error) throw error;

        db.close
        callback(documents);
      });
    });
  },

  getAllPolls: function (callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('polls');

      collection.find()
                .sort({ created: -1 })
                .toArray( (error, documents) => {
                  db.close();
                  callback(documents);
                });
    });
  },

  getPoll: function (id, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('polls');

      collection.find({ "_id": mongodb.ObjectId(id) })
                .toArray( (error, documents) => {
                  if (error) console.warn(error);

                  db.close();
                  callback(documents[0]);
                });
    });
  },

  updatePoll: function (data, callback) {
    const previousResponses = data.previous.poll.responses;
    const id = data.previous._id;

    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('polls');
      const key = "poll.responses." + data.response;
      const poll = {};

      poll[key] = 1;

      collection.update(
        { "_id": mongodb.ObjectId(id) },
        { $inc: { ["poll.responses." + data.response]: 1 } }
      ).then( () => {
        callback({ "update": "complete" });
      }).catch( (error) => {
        throw error;
      });
    });
  },

  addPoll: function (data, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('polls');

      collection.insert(data).then( () => {
        db.close();
        this.getPollByTimestamp(data.created, callback);
      }).catch( (error) => {
        throw error;
      });
    });
  },

  getPollByTimestamp: function (timestamp, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('polls');

      collection.find(
        { "created": timestamp },
        { "_id": 1 }
      ).toArray( (error, documents) => {
        if (error) throw error;

        db.close();
        callback(documents[0]);
      });
    });
  },

  deletePoll: function (id) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('polls');

      collection.remove({ "_id": mongodb.ObjectId(id) })
                .catch( (error) => { throw error; });
      db.close();
    });
  },

  updateUserHistory: function (user, id, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('users');

      collection.update(
        { "user": user },
        { $push: { "polls": id } }
      ).then( () => {
        const json = { "update": "complete" };

        db.close();
        callback(json);
      }).catch( (error) => {
        if (error) throw error;
      });
    });
  },

  findUser: function (user, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('users');

      collection.find(
        { "user": user },
        { _id: 1 }
      ).toArray( (error, documents) => {
        if (error) throw error;
        if (documents.length === 0) {
          this.addUser(user, callback);
        } else {
          callback(documents[0]._id);
        }
      });
    });
  },

  userLogin: function (userID, callback) {
    MongoClient.connect(config.dbUrl, (error, db) => {
      if (error) throw error;

      const collection = db.collection('users');

      collection.find(
        { _id: mongodb.ObjectId(userID) },
        { user: 1, _id: 0 }
      ).toArray( (error, documents) => {
        if (error) throw error;

        callback(documents[0]);
      })
    });
  }
}

module.exports = mongo;
