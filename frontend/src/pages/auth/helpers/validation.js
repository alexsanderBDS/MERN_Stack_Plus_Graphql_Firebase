import validator from "validator";

const validEmail = (email) => {
  return new Promise((resolve, reject) => {
    if (validator.isEmail(email)) {
      resolve("Okay");
    } else {
      reject("Provide an valid email!");
    }
  });
};

const validPassword = (password, password2) => {
  return new Promise((resolve, reject) => {
    if (password > 6 && password === password2) {
      resolve("Okay");
    } else {
      reject(Error("Invalid password!"));
    }
  });
};

export { validEmail, validPassword };
