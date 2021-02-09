const admin = require("firebase-admin");
const serviceAccount = require("../config/firebaseAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports.authCheck = async (req) => {
  console.log(req.headers.authtoken);

  try {
    const currentUser = await admin.auth().verifyIdToken(req.headers.authtoken);
    console.log("My current user", currentUser);
    return currentUser;
  } catch (error) {
    console.log("Auth check error:", error);
    throw new Error("Invalid or expired token!");
  }
};
