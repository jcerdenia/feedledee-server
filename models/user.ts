import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  dateCreated: {
    type: Date,
    default: new Date(),
  },
  feedIDs: [
    {
      type: String,
      required: [false],
    },
  ],
});

export default mongoose.model("user", userSchema);
