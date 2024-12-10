import mongoose from "mongoose";

const connectToDB = async () => {
  const connectionUrl =
    "mongodb+srv://wa254549:auth2@cluster0.j6ua5.mongodb.net/";

  mongoose
    .connect(connectionUrl)
    .then(() => console.log("Database Connection Established"))
    .catch((e) => console.log(e));
};

export default connectToDB;
