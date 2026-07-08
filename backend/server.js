require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");
const apiRoutes = require("./routes/api");

const app = express();
const PORT = process.env.PORT || 5000;

// ----------------------
// Security
// ----------------------
app.use(
  helmet({
    contentSecurityPolicy: false,
  })
);

// ----------------------
// CORS
// ----------------------
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:5173",
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      // Allow Postman, curl, server-to-server requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);

      return callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  })
);

// Handle preflight requests
app.options("*", cors());

// ----------------------
// Parsers
// ----------------------
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ----------------------
// Logger
// ----------------------
app.use(morgan("dev"));

// ----------------------
// Rate Limiter
// ----------------------
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

app.use("/api", limiter);

// ----------------------
// Static Files
// ----------------------
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../dist")));
}

// ----------------------
// Database
// ----------------------
let dbConnected = false;

connectDB()
  .then((conn) => {
    dbConnected = !!conn;
    app.set("dbConnected", dbConnected);
    console.log("Database:", dbConnected ? "Connected" : "Disconnected");
  })
  .catch((err) => {
    console.error(err);
    app.set("dbConnected", false);
  });

// ----------------------
// Routes
// ----------------------
app.use("/api", apiRoutes);

// ----------------------
// Health Check
// ----------------------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Portfolio Backend Running 🚀",
  });
});

app.get("/health", (req, res) => {
  res.json({
    success: true,
    database: dbConnected,
    uptime: process.uptime(),
  });
});

// ----------------------
// Error Handler
// ----------------------
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ----------------------
// Server
// ----------------------
app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
  console.log(`NODE_ENV = ${process.env.NODE_ENV}`);
});