import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required."],
  },
  password: {
    type: String,
    required: [true, "Password is required."],
  },
  date_created: {
    type: Date,
    default: new Date(),
  },
  subscriptions: [
    {
      feed_id: {
        type: String,
        required: [true, "Feed ID is required."],
      },
      category: {
        type: String,
        default: "Uncategorized",
      },
    },
  ],
});

export default mongoose.model("user", userSchema);
