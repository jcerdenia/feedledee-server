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
      url: {
        type: String,
        required: [true, "Subscription URL is required."],
      },
      category: {
        type: String,
        default: "Uncategorized",
      },
    },
  ],
  read_entries: [
    {
      entry_id: {
        type: String,
        required: [true, "Entry ID is required."],
      },
    },
  ],
});

export default mongoose.model("user", userSchema);
