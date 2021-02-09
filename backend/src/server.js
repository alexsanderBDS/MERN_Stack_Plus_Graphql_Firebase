const express = require("express");
const path = require("path");
const http = require("http");
// const cors = require("cors");
const { ApolloServer } = require("apollo-server-express");
const { mergeTypeDefs, mergeResolvers } = require("@graphql-tools/merge");
const { loadFilesSync } = require("@graphql-tools/load-files");
// const { authCheck } = require("./helpers/auth");
const { mgdb } = require("./config/mongodbDatabase");
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8000;

mgdb();

// app.use(cors());
// app.use(express.json());

const typeDefs = mergeTypeDefs(loadFilesSync(path.join(__dirname, "./schema")));
const resolvers = mergeResolvers(
  loadFilesSync(path.join(__dirname, "./resolvers"))
);

const serverApolloRun = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req, res }) => ({ req, res }),
});

serverApolloRun.applyMiddleware({ app });

const httpServer = http.createServer(app);

httpServer.listen(port, () => {
  console.log(
    `Running on port ${port} with graphql on ${serverApolloRun.graphqlPath}`
  );
});
