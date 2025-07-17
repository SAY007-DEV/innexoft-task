import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  empname: {
    type: String,
    required: true,
   
  },
  email: {
    type: String,
    required: true,
    // unique: true,
    
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
    
  },
});

export default mongoose.model("Emp", userSchema);
export const User = mongoose.model("User", userSchema);