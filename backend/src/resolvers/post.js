const { authCheck } = require("../helpers/auth");
const Post = require("../models/post");

const getPosts = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  const cardsUser = await Post.find({ author: currentUser.email });

  return cardsUser;
};

const createPost = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  return new Post({
    ...args,
    author: currentUser.email,
  }).save();
};

const updatePost = async (parent, args, { req }) => {
  const currentUser = await authCheck(req);

  const result = await Post.findOneAndUpdate(
    { _id: args._id },
    { ...args, author: currentUser.email },
    {
      new: true,
    }
  );

  return result;
};

const deletePost = async (parent, { _id }, { req }) => {
  await authCheck(req);
  const result = await Post.findOneAndDelete({ _id });

  return result;
};

module.exports = {
  Query: {
    getPosts,
  },
  Mutation: {
    createPost,
    updatePost,
    deletePost,
  },
};
