const {Auth: AuthService} = require('../services')

// const registration = async (req, res) => {
//     const data = req.body;
//   const { doc } = await AuthService.registration(data);

//   if (doc) {
//    return res.getRequest(doc)
//   }
// };

const registration = async (req, res) => {
  const data = req.body;
  const { status, doc } = await AuthService.registration(data);

  return res.status(status).json(doc);
};

const login = async (req, res) => {
  const { doc } = await AuthService.login(req.body);

  if (doc) {
   return res.getRequest(doc)
  }

  return res.unAuthorized();
};

const verifyJWT = async (req, res, next) => {
  try {
    const { authorization } = req.headers;
    const response = AuthService.verifyJWT(authorization);

    if (response) {
      req.user = response;

      return next();
    }

    return res.unAuthorized();
  } catch (err) {
    return res.unAuthorized();
  }
};


module.exports = {
  login, registration, verifyJWT,
};
