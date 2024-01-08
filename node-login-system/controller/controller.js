import bcrypt from "bcrypt";
import userModel from "../model/users.js";
import { response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export async function validate(req, res, next) {
  const { email, password, contact } = req.body;

  const pattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!email && !contact) {
    res.status(500).send({
      msg: "email or password required",
      error: "",
    });
    return;
  }

  var passwordValidatePromise;
  var ContactValidate;
  var emailValidatePromise;

  if (email) {
    emailValidatePromise = new Promise(async (resolve, reject) => {
      if (email === "admin") {
        resolve();
      }
      if (pattern.test(email)) {
        resolve();
      } else {
        reject("Invalid email!!!");
      }
    });
  }

  passwordValidatePromise = new Promise(async (resolve, reject) => {
    // Minimum length of the password
    var minLength = 8;

    var uppercaseRegex = /[A-Z]/;
    var lowercaseRegex = /[a-z]/;
    var digitRegex = /\d/;

    var isLengthValid = password.length >= minLength;
    var hasUppercase = uppercaseRegex.test(password);
    var hasLowercase = lowercaseRegex.test(password);
    var hasDigit = digitRegex.test(password);

    if (!isLengthValid) reject("Passwrd must be 6 characters long!!!");
    if (!hasUppercase)
      reject("Password must contain atleast one uppercase letter!!!");
    if (!hasLowercase)
      reject("Password must contain atleast one lowercase letter!!!");
    if (!hasDigit) reject("Password must contain atleast one digit");

    resolve();
  });

  if (contact) {
    ContactValidate = new Promise((resolve, reject) => {
      var digitRegex = /^\d+$/;

      var isNumeric = digitRegex.test(contact);

      var isValidLength = contact.toString().length === 10;
      console.log(contact.length);

      if (isNumeric && isValidLength) {
        resolve();
      } else {
        reject("Invalid contact number!!!");
      }
    });
  }

  Promise.all([emailValidatePromise, passwordValidatePromise, ContactValidate])
    .then(() => {
      next();
    })
    .catch((err) => {
      res.status(500).json({
        msg: "invalid credentials",
        error: err,
      });
    });
}

export async function register(req, res) {
  try {
    const { email, password, contact, name, profile } = req.body;
    if (!email && !contact) {
      res.status(500).send({
        msg: "Enter either email or contact number",
        error: null,
      });
    }

    const userPromise = new Promise(async (resolve, reject) => {
      try {
        const existEmail = await userModel.findOne({ email });
        const existContact = await userModel.findOne({ contact });

        existEmail ? reject("Email already registered!!!") : resolve();
        existContact
          ? reject("Mobile number already registered!!!")
          : resolve();
      } catch (error) {
        reject(error);
      }
    });

    userPromise
      .then(() => {
        if (password) {
          bcrypt
            .hash(password, 12)
            .then((hashedPassword) => {
              const User = new userModel({
                password: hashedPassword,
                profile: profile || "",
                email,
                contact,
                name,
              });

              User.save()
                .then((result) => {
                  res.status(201).send("User registered successfully...");
                })
                .catch((err) => {
                  console.log(err);
                  return res.status(500).json({
                    msg: "can't save the user",
                    error: err,
                  });
                });
            })
            .catch((err) => {
              return res.status(500).json({
                msg: "cannot hash password",
                error: err,
              });
            });
        }
      })
      .catch((err) => {
        return res.status(500).json({
          msg: err,
          error: err,
        });
      });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "might be req.body error",
      error,
    });
  }
}

export async function adminLogin(req, res, email, password) {
  if (!email) {
    return res.status(500).send({
      msg: "Please enter email!!!",
    });
  }

  const passwordCheck = password === process.env.ADMIN_PASSWORD;

  if (!passwordCheck) {
    return res.status(400).send({
      msg: "Wrong Password",
      error: "",
    });
  }

  const token = jwt.sign(
    {
      isAdmin: true,
    },
    process.env.JWT_SECRET,
    { expiresIn: "24h" }
  );

  return res.status(200).send({
    msg: "login successfully",
    token,
  });
}

export async function login(req, res) {
  try {
    const { email, contact, password } = req.body;

    if (email === process.env.ADMIN_USERNAME) {
      return adminLogin(req, res, email, password);
    }

    if (!email && !contact) {
      res.status(500).send({
        msg: "enter email or contact",
      });
      return;
    }

    const userPromise = new Promise((resolve, reject) => {
      try {
        const existEmail = userModel.findOne({ email });
        const existContact = userModel.findOne({ contact });

        if (email) {
          existEmail
            .then((user) => {
              resolve(user);
            })
            .catch((err) => reject("Email not registered!!!"));
        }

        if (contact) {
          existContact
            .then((user) => {
              resolve(user);
            })
            .catch((err) => reject("Contact not registered!!!"));
        }
      } catch (error) {
        reject(error);
      }
    });

    userPromise
      .then(async (user) => {
        await bcrypt
          .compare(password, user.password)
          .then((passwordCheck) => {
            if (!passwordCheck) {
              return res.status(400).send({
                msg: "Wrong Password",
                error: "",
              });
            }

            const token = jwt.sign(
              {
                id: user._id,
                email: user.email,
                profile: user.profile,
                contact: user.contact || "",
                name: user.name,
              },
              process.env.JWT_SECRET,
              { expiresIn: "24h" }
            );

            return res.status(200).send({
              msg: "login successfully",
              userMail: user.email,
              token,
            });
          })
          .catch((err) => {
            console.log(err);
            res.status(500).send({
              msg: "Wrong Password !!!",
              error: err,
            });
          });
      })
      .catch((err) => {
        console.log(err);
        res.status(500).send({
          msg: "user not found!!!",
          error: err,
        });
      });
  } catch (error) {
    res.status(500).send({
      msg: "login Controller try catch",
      error,
    });
  }
}

export async function getUser(req, res) {
  try {
    const details = req.user;
    if (details) {
      return res.status(200).send({
        msg: "successful",
        user: details,
      });
    }
  } catch (error) {
    res.status(500).send({
      msg: "user not found!!!",
      error,
    });
  }
}

export async function updateUser(req, res, userID) {
  try {
    console.log(req.user);
    const { isAdmin } = req.user;
    if (isAdmin) {
      var { id } = req.userID;
    } else {
      var { id } = req.user;
    }
    // const { id } = req.user;
    if (id) {
      const { name, profile } = req.body;

      // update the data
      userModel
        .updateOne({ _id: id }, { name, profile })
        .then(() => {
          return res.status(201).send({ msg: "User updated successfully" });
        })
        .catch((err) => {
          throw err;
        });
    } else {
      return res.status(401).send({
        msg: "user not found...!!!",
        error: "user not found......!!!",
      });
    }
  } catch (error) {
    res.status(500).send({
      msg: "",
      error,
    });
  }
}
