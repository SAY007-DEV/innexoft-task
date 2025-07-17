import express from 'express';


const router = express.Router();


router.post('/api/employees', async (req, res) => {
  try {
    const { name, designation, email, phone, password } = req.body;
    const newEmp = new Emp({
      empname: name,
      designation,
      email,
      phone,
      password
    });
    await newEmp.save();
    res.status(201).json({ message: 'Employee created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating employee', error: error.message });
  }
}
);