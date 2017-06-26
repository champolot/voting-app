const express = require('express'),
      cors = require('cors'),
      bodyParser = require('body-parser'),
      passport = require('passport'),
      Strategy = require('passport-github').Strategy,
      config = require('./config/main'),
      mongo = require('./utilities/mongo'),
      app = express();

app.use(cors());

passport.use(new Strategy(
  {
    clientID: config.githubID,
    clientSecret: config.githubSecret,
    callbackURL: 'https://thekholm80-voting.herokuapp.com/auth/github/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    return cb(null, profile);
  }
));

passport.serializeUser( (user, cb) => {
    cb(null, user);
});

passport.deserializeUser( (obj, cb) => {
    cb(null, obj);
});

app.set('port', config.port);

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json({ strict: false }));
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/github', passport.authenticate('github'));

app.get('/auth/github/callback', passport.authenticate('github'), (request, response) => {
  const user = request.user.username;
  const callback = (data) => {
    response.redirect('/success/' + data);
  }

  mongo.findUser(user, callback);
});

app.get('/polls/all', (request, response) => {
    const callback = (data) => {
        response.json(data);
    }

    mongo.getAllPolls(callback);
});

app.get('/polls/user/:user', (request, response) => {
    const user = request.params.user;
    const callback = (data) => {
        response.json(data);
    }

    mongo.getUserPolls(user, callback);
});

app.get('/polls/delete/:id', (request, response) => {
    const id = request.params.id;

    mongo.deletePoll(id);
    response.json({ "success": "poll deleted" });
});

app.post('/polls/update', (request, response) => {
    const callback = (data) => {
        response.json(data);
    }

    mongo.updatePoll(request.body, callback);
});

app.post('/polls/add', (request, response) => {
    const callback = (data) => {
        response.json(data);
    }

    mongo.addPoll(request.body, callback);
});

app.get('/getpoll/:id', (request, response) => {
    const id = request.params.id;
    const callback = (data) => {
        response.json(data);
    }

    mongo.getPoll(id, callback);
});

app.get('/user', (request, response) => {
    const user = request.query.user;
    const callback = (data) => {
        response.json(data);
    }

    mongo.processUser(user, callback);
});

app.get('/user/login/:id', (request, response) => {
  const userID = request.params.id;
  const callback = (data) => {
    const user = { "username": data.user };

    response.json(user);
  }

  mongo.userLogin(userID, callback);
});

app.get('/user/history/:user', (request, response) => {
    const user = request.params.user;
    const callback = (data) => {
        response.json(data);
    }

    mongo.getUserVotes(user, callback);
});

app.get('/user/vote/:user', (request, response) => {
  const callback = (data) => {
    response.json(data);
  }
  const id = request.query.id;
  const user = request.params.user;

  mongo.updateUserHistory(user, id, callback);
});

app.get('/*', (request, response) => {
  response.sendFile(__dirname + '/public/' + 'index.html');
});

app.listen(app.get('port'), () => {
    console.log('Node is running on port', app.get('port'));
});
