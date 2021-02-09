const mongoose = require("mongoose");

const mgdb = async () => {
  try {
    const success = await mongoose.connect(process.env.MONGODB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });

    console.log("DB connected!", success.connection.name);
  } catch (error) {
    console.log("DB connection error:", error);
  }
};

module.exports = { mgdb };
