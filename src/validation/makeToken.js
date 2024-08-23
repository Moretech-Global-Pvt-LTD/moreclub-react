// import crypto from 'crypto';
// import jwt from 'jsonwebtoken';




// // Generate a key from a password using a secure KDF
// const generateKey = (salt) => {
//   const password = process.env.REACT_APP_PASSWORD;
//   if (!password) {
//     throw new Error('Encryption password is not defined in environment variables.');
//   }
//   return crypto.scryptSync(password, salt, 32); // 32 bytes for AES-256
// };

// // Encrypt function using AES-GCM for an object
// const encryptObject = (obj) => {
//   const salt = crypto.randomBytes(16); // Generate a random salt
//   const key = generateKey(salt);

//   const iv = crypto.randomBytes(12); // Initialization vector for AES-GCM
//   const cipher = crypto.createCipheriv('aes-256-gcm', key, iv);

//   const json = JSON.stringify(obj); // Convert the object to a JSON string
//   let encrypted = cipher.update(json, 'utf8', 'base64');
//   encrypted += cipher.final('base64');

//   const authTag = cipher.getAuthTag().toString('base64');

//   // Combine salt, IV, auth tag, aREACT_PASSWORDnd encrypted text
//   const encryptedData = `${salt.toString('base64')}:${iv.toString('base64')}:${authTag}:${encrypted}`;

//   // Create JWT token
//   const token = jwt.sign({ encryptedData }, process.env.JWT_SECRET, { expiresIn: '10m' });
//   return encodeURIComponent(token); // Ensure it's URL-safe
// };

// export { encryptObject };

import * as CryptoJS from "crypto-js";

const generateKey = (salt) => {
  const password = process.env.REACT_APP_PASSWORD;
  if (!password) {
    throw new Error(
      "Encryption password is not defined in environment variables."
    );
  }
  return CryptoJS.PBKDF2(password, salt, {
    keySize: 32 / 4,
    iterations: 10000,
  });
};

const encryptObject = (obj) => {

  console.log("object for encryption", obj)
  console.log(
    "env data ",
    process.env.REACT_JWT_SECRET,
    process.env.REACT_APP_PASSWORD
  );

  const salt = CryptoJS.lib.WordArray.random(16 / 4); // Generate a random salt
  const key = generateKey(salt);

  const iv = CryptoJS.lib.WordArray.random(12 / 4); // Initialization vector for AES-GCM
  const encrypted = CryptoJS.AES.encrypt(JSON.stringify(obj), key, {
    iv: iv,
    mode: CryptoJS.mode.GCM,
  });

  const authTag = encrypted.authTag.toString(CryptoJS.enc.Base64);

  // Combine salt, IV, auth tag, and encrypted text
  const encryptedData = `${salt.toString(CryptoJS.enc.Base64)}:${iv.toString(
    CryptoJS.enc.Base64
  )}:${authTag}:${encrypted.ciphertext.toString(CryptoJS.enc.Base64)}`;

  // Create JWT token
  const token = CryptoJS.JWT.sign(
    { encryptedData },
    process.env.REACT_JWT_SECRET,
    {
      expiresIn: "10m",
    }
  );
  return encodeURIComponent(token); // Ensure it's URL-safe
};

export { encryptObject };

