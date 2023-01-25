import mongoose, { models } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: String,
    lastname: String,
    avatar: String,
    email: String,
    salary: Number,
    date: String,
    status: String,
  },
  {
    timestamps: true,
  }
);

const Users = models.User || mongoose.model("User", userSchema);

export default Users;
