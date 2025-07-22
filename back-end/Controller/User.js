import User from "../Database/UserSchema.js";
import bcrypt from 'bcryptjs';

const createUser = async (req, res) => {
  try {
    const { name, designation, email, phone, password } = req.body;
    
    const hashedPassword = await bcrypt.hash(password, 10);
    const newEmp = new User({
      name,
      designation,
      email,
      phone,
      password: hashedPassword
    });
    await newEmp.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
    console.log(error);
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  // console.log(user);
  
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (!user.password) return res.status(401).json({ message: 'No password set for this user' });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

  res.status(200).json({ message: 'Login successful', user });
}

export  { createUser, loginUser };