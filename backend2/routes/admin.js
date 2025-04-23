import express from "express";
import { auth, verifyAdmin } from "../middleware/auth.js"; // Import auth and verifyAdmin
import User from "../models/User.js";
import Appointment from "../models/Appointment.js";

const router = express.Router();

// Get all users (admin-only)
router.get("/users", auth, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find({}, { password: 0 }); // Exclude passwords
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete a user (admin-only)
router.delete("/users/:id", auth, verifyAdmin, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all appointments (admin-only)
router.get("/appointments", auth, verifyAdmin, async (req, res) => {
  try {
    const appointments = await Appointment.find();
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;