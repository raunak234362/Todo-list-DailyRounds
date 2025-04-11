import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  username: { type: String, required: true, unique: true },
  email: String,
});

export default mongoose.model("User", userSchema);
``;
