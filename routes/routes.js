const jwt = require('jsonwebtoken');
const { Task } = require('../config/model');
const SECRET_KEY = 'Marmor1$';

module.exports = (app, passport) => {

  app.get('/logout', (req, res, next) => {
    res.sendStatus(200);
  });

  app.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    if (!validation(email, password, res)) {
      return;
    }

    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        var errorMessage = req.flash('loginMessage')[0];
        console.log(errorMessage);
        if (errorMessage) {
          return res.status(401).json({ messageError: errorMessage });
        } else {
          return res.status(401).json({ messageError: 'Unknown error in the registry.' });
        }
      }

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '10s' });

      res.status(200).json({ token })

    })(req, res, next);
  });











  app.post('/signup', (req, res, next) => {
    const { email, password } = req.body;
    if (!validation(email, password, res)) {
      return;
    }

    passport.authenticate('local-signup', (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        
        var errorMessage = req.flash('signupMessage')[0];

        if (errorMessage) {
          return res.status(401).json({ messageError: errorMessage });
        } else {
          return res.status(400).json({ messageError: 'Unknown error in the registry.' });
        }
      }

      const token = jwt.sign({ userId: user._id }, SECRET_KEY, { expiresIn: '1m' });
      
      return res.status(200).json({ token });

    })(req, res, next);
  });

  function validation(email, password, res) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    if (!email || !password) {
      if (!email && !password) {
        res.status(400).json({ messageError: 'Email and password are required.' });
      } else if (!email) {
        res.status(400).json({ messageError: 'Email is required.' });
      } else if (!password) {
        res.status(400).json({ messageError: 'Password is required.' });
      }
      return false;
    }

    if (!emailRegex.test(email)) {
      res.status(400).json({ messageError: 'The email format is invalid.' });
      return false;
    }
    if (!passwordRegex.test(password)) {
      res.status(401).json({ messageError: 'The password format is invalid.' });
      return false;
    }
    return true;
  }

  app.get('/tasks', (req, res) => {
    Task.find()
      .then(tasks => {
        res.json(tasks);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error fetching tasks' });
      });
  });


  app.post('/tasks', (req, res) => {
    const newTask = new Task(req.body);

    newTask.save()
      .then(savedTask => {
        res.status(201).json(savedTask);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error creating task' });
      });
  });


  app.put('/tasks/:id', (req, res) => {
    Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
      .then(updatedTask => {
        if (!updatedTask) {
          return res.status(404).json({ error: 'Task not found' });
        }
        res.json(updatedTask);
      })
      .catch(error => {
        res.status(500).json({ error: 'Error updating task' });
      });
  });


  app.delete('/tasks/:id', (req, res) => {
    Task.findByIdAndDelete(req.params.id)
      .then(deletedTask => {
        if (!deletedTask) {
          return res.status(404).json({ error: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted' });
      })
      .catch(error => {
        res.status(500).json({ error: 'Error deleting task' });
      });
  });


};