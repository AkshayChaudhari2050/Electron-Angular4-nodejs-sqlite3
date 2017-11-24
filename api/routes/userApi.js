var session = require('express-session');
var bcrypt = require('bcrypt');
module.exports = (app, db) => {
  //get All users
  app.get('/api/users', (req, res) => {
    db.users.findAll()
      .then(users => {
        res.json(users);
      });
  });
  //
  app.get('/api/user/:userid', (req, res) => {
    const userid = req.params.userid;
    db.users.find({
      where: {
        userid: userid
      }
    }).then(users => {
      res.json(users)
    })
  })
  //
  app.post('/api/user', (req, res) => {
    const UserName = req.body.UserName;
    const password = req.body.password;
    db.users.create({
      UserName: UserName,
      password: password,
    }).then(newuser => {
      res.json(newuser)
    })
  })

  app.put('/api/user/:userid', (req, res) => {
    const userid = req.params.userid;
    const updates = {
      UserName: req.body.UserName,
      password: req.body.password,
    }
    db.users.find({
        where: {
          userid: userid
        }
      })
      .then(users => {
        return users.updateAttributes(updates)
      })
      .then(usersupdate => {
        res.json(usersupdate);
      });
  });
  // DELETE single owner
  app.delete('/api/user/:userid', (req, res) => {
    const userid = req.params.userid;
    db.users.destroy({
        where: {
          userid: userid
        }
      })
      .then(Deletedusers => {
        res.json(Deletedusers);
      });
  });

  app.post('/api/user/login', (req, res) => {
    var UserName = req.body.UserName,
      password = req.body.password;
    db.users.findOne({
      where: {
        UserName: UserName
      }
    }).then(function (user) {
      if (!user) {
        res.json({
          succes: false,
          msg: "No User Found"
        })
      } else if (!bcrypt.compareSync(password, user.password)) {
        res.json({
          succes: false,
          msg: "Password Not Match"
        })
      } else {
        res.json({
          succes: true,
          msg: "logging success"
        })
      }
    });
  });
}
