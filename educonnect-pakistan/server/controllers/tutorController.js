const User = require("../models/User");

// GET: Filter tutors
const getFilteredTutors = async (req, res) => {
    try {
      const {
        subject,
        city,
        mode,
        minPrice,
        maxPrice,
        minRating,
        day,
      } = req.query;
  
      const filter = { role: "tutor" };
  
      if (subject) filter.subjects = { $in: [subject] };
      if (mode === "online") filter.city = "online";
      else if (city) filter.city = city;
  
      if (minPrice || maxPrice) {
        filter.hourlyRate = {};
        if (minPrice) filter.hourlyRate.$gte = Number(minPrice);
        if (maxPrice) filter.hourlyRate.$lte = Number(maxPrice);
      }
  
      if (minRating) filter.rating = { $gte: Number(minRating) };
  
      if (day) {
        const allowedDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];
        if (allowedDays.includes(day.toLowerCase())) {
          filter[`availability.${day.toLowerCase()}`] = { $exists: true, $not: { $size: 0 } };
        } else {
          return res.status(400).json({ error: "Invalid day filter provided." });
        }
      }
  
      const tutors = await User.find(filter);
      res.status(200).json(tutors);
    } catch (error) {
      console.error("Error in getFilteredTutors:", error);
      res.status(500).json({ error: "Failed to fetch tutors", details: error.message });
    }
  };
  

// GET single tutor profile
const getTutorById = async (req, res) => {
    try {
      const tutorId = req.params.id;
  
      // If invalid ObjectId, skip query
      if (!mongoose.Types.ObjectId.isValid(tutorId)) {
        return res.status(400).json({ message: "Invalid tutor ID" });
      }
  
      const tutor = await User.findById(tutorId);
      if (!tutor || tutor.role !== "tutor") {
        return res.status(404).json({ message: "Tutor not found" });
      }
  
      res.json(tutor);
    } catch (err) {
      res.status(500).json({ error: "Failed to fetch tutor", details: err.message });
    }
  };
// PUT: Update tutor profile or create one if not exists (upsert)
const updateTutorProfile = async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      // Validate that the user exists
      const existingUser = await User.findById(id);
      if (!existingUser) {
        return res.status(404).json({ error: "Tutor not found." });
      }
  
      // Perform the update
      const updatedUser = await User.findByIdAndUpdate(id, updateData, { new: true, runValidators: true });
  
      res.status(200).json(updatedUser);
    } catch (error) {
      console.error("Error updating tutor profile:", error);
  
      // Handle specific errors
      if (error.name === 'ValidationError') {
        return res.status(400).json({ error: "Validation error.", details: error.message });
      }
  
      res.status(500).json({ error: "An unexpected error occurred." });
    }
  };
  
  
module.exports = {
  getFilteredTutors,
  getTutorById,
  updateTutorProfile,
};
