
const mongoose = require('mongoose');
const { User } = require('../config/model'); 

module.exports = () => {
  
  beforeAll(async () => {
    const url = `mongodb://127.0.0.1/tu-base-de-datos-de-pruebas`; 
    await mongoose.connect(url);
    
    process.env.SECRET_KEY = 'your_test_secret_key';
  });

  
  afterAll(async () => {
    await mongoose.connection.close();
  });

  
  beforeEach(async () => {
    await User.deleteMany({});
    
  });
};
