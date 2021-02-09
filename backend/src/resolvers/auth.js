const { authCheck } = require("../helpers/auth");
const User = require("../models/user");
const shortid = require("shortid");

const me = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);
  return await User.findOne({ email: currentUser.email }).exec();
};

const createUser = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  const user = await User.findOne({ email: currentUser.email });

  return user
    ? user
    : new User({
        email: currentUser.email,
        username: shortid.generate(),
      }).save();
};

module.exports = {
  Query: {
    me,
  },
  Mutation: {
    createUser,
  },
};
