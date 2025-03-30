const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Connect DB
connectDB();

// ✅ Routes
app.get("/", (req, res) => res.send("EduConnect API Running"));
const tutorRoutes = require("./routes/tutors");
app.use("/api/tutors", tutorRoutes); // ✅ IMPORTANT

const sessionRoutes = require("./routes/sessions");
app.use("/api/sessions", sessionRoutes);

const reviewRoutes = require("./routes/reviews");
app.use("/api/reviews", reviewRoutes);

const wishlistRoutes = require("./routes/wishlist");
app.use("/api/wishlist", wishlistRoutes);

const adminRoutes = require("./routes/admin");
app.use("/api/admin", adminRoutes);

const reportRoutes = require("./routes/report");
app.use("/api/reports", reportRoutes);

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
