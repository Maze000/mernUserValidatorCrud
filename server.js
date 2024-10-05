const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const passport = require('passport');
const flash = require('connect-flash');
const morgan = require('morgan');
const session = require('express-session');

 
  app.use(session({
    secret: 'mazeactions',
    resave: false,
    saveUninitialized: true
  }));  

require('./config/passport.js')(passport);
app.set('port', process.env.PORT || 3000);


app.use(morgan('dev'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(passport.initialize());

app.use(flash());



require('./routes/routes.js')(app, passport);
app.use(express.static(path.join(__dirname, './dist')));


app.get('*', (req, res) => {

  res.sendFile(path.join(__dirname, './dist', 'index.html'));


});


if (process.env.NODE_ENV !== 'test') {

  
mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.error('Error connecting to the database:', err.message);
  });

app.listen(app.get('port'), () => {
  console.log('Super server run in port : ', app.get('port'));
  
});

};

module.exports=app;
