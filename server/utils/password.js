// helper.js
const bcrypt = require('bcrypt');

const saltRounds = 10;

// Function to hash a password
async function hashPassword(password) {
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
    } catch (err) {
        console.error('Error hashing password:', err);
        throw err;
    }
}

// Function to compare a password with a hashed password
async function comparePassword(password, hashedPassword) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        return match;
    } catch (err) {
        console.error('Error comparing password:', err);
        throw err;
    }
}

module.exports = {
    hashPassword,
    comparePassword
};
