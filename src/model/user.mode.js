import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
    default:"male"
  },
});

const User = mongoose.model("User", userSchema);

export default User;
