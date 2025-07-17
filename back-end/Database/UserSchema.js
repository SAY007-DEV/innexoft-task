import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
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
    
  },
  phone: {
    type: Number,
    
    
  },
  designation: {
    type: String,
   
  },
});

// export default mongoose.model("Emp", userSchema);
// export const User = mongoose.model("User", userSchema);

const User = mongoose.model("User", userSchema);
export default User;