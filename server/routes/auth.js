const {
    registration, login,
  } = require('../controllers/auth');
  
  module.exports = (router) => {
    router.post('/registration', registration);
    router.post('/login', login);
  };
  