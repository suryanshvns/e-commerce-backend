// Import the bcrypt helper
const { hashPassword, comparePassword } = require('../utils/password');
const jwt = require('jsonwebtoken');
const {
  users: UserModel,
} = require('../database');

const createJWT = (data) => {
  const token = jwt.sign(data, 'jafhaiofhsj');
  return token;
};

const verifyJWT = (bearerToken) => {
  const token = bearerToken.split(' ')[1];
  const decoded = jwt.verify(token, 'jafhaiofhsj');
  return decoded;
};

// const registration = async (payload) => {
//   try {
//     const {
//       email,
//       password,
//       firstName,
//       lastName,
//       establishmentType,
//     } = payload;

//     const allowedEstablishmentTypes = [
//       'Clinic',
//       'Clinic with Pharmacy',
//       'Doctor',
//       'Distributor',
//       'Pharmacy',
//       'Hospital',
//       'Nursing Home',
//       'Medical Student',
//       'Other',
//     ];

//     if (!allowedEstablishmentTypes.includes(establishmentType)) {
//       return { doc: { message: 'invalid establishment type' } };
//     }

//     const isUserExist = await UserModel.findOne({
//       where: { email },
//     });

//     if (!isUserExist) {
//       const hashedPassword = await hashPassword(password);

//       const data = {
//         email,
//         password: hashedPassword,
//         first_name: firstName,
//         last_name: lastName,
//         establishment_type: establishmentType, 
//       };

//       const response = await UserModel.create(data);

//       if (response) {
//         return { doc: { message: 'successfully saved' } };
//       }
//     }

//     return { doc: { message: 'user already exist' } };
//   } catch (error) {
//     return { error };
//   }
// };

const registration = async (payload) => {
  try {
    const { email, password, firstName, lastName, establishmentType } = payload;

    const allowedEstablishmentTypes = [
      'Clinic', 'Clinic with Pharmacy', 'Doctor', 'Distributor',
      'Pharmacy', 'Hospital', 'Nursing Home', 'Medical Student', 'Other'
    ];

    if (!allowedEstablishmentTypes.includes(establishmentType)) {
      return { status: 400, doc: { message: 'Invalid establishment type' } };
    }

    const isUserExist = await UserModel.findOne({ where: { email } });

    if (isUserExist) {
      return { status: 409, doc: { message: 'User already exists' } };
    }

    const hashedPassword = await hashPassword(password);

    const data = {
      email,
      password: hashedPassword,
      first_name: firstName,
      last_name: lastName,
      establishment_type: establishmentType,
    };

    const response = await UserModel.create(data);

    if (response) {
      return { status: 201, doc: { message: 'Successfully saved' } };
    }

    return { status: 500, doc: { message: 'Failed to save user' } };
  } catch (error) {
    return { status: 500, error };
  }
};

const login = async (payload) => {
  const { email, password } = payload;
  const isUserExist = await UserModel.findOne({
    where: { email },
  });

  if (isUserExist) {
    const {
      dataValues: {
        password: savedPassword,
      },
    } = isUserExist;

    // Compare the provided password with the saved hashed password
    const isMatch = await comparePassword(password, savedPassword);

    if (isMatch) {
      const data = {
         email,
      };
      const token = createJWT(data);

      return { doc: { isLoggedin: true, token, message: 'logged in successfully' } };
    }

    return { doc: { isLoggedin: false, message: 'incorrect password' } };
  }

  return { errors: [{ key: 'username', messages: 'user or password is wrong' }] };
};

module.exports = {
  login, registration, verifyJWT
};
