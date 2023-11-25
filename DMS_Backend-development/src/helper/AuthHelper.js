import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/index.js";


function encryptPassword(plainPassword, saltRounds = 10) {
  return bcrypt.hashSync(plainPassword, saltRounds);
}

const verifyPassword = async (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

function verifyJWT(token) {
  try {
    let decoded = jwt.verify(token, config.jwt_secret);
    return { status: true, data: decoded };
  } catch (error) {
    return { status: false, error: error };
  }
}

export { encryptPassword, verifyPassword, verifyJWT };
