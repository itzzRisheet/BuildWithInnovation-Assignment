import mongoose, { mongo } from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  contact: {
    type: Number,
  },
  name: {
    type: String,
  },
  profile: {
    type: String,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model("users", userSchema);
