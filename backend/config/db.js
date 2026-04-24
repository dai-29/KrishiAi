// MongoDB connection — resilient (server stays up even if DB fails)
import mongoose from "mongoose";

const connectDB = async () => {
  const uri = process.env.MONGO_URI || "";

  // Skip if placeholder/empty
  if (!uri || uri.includes("<username>") || uri.includes("xxxxx")) {
    console.warn("⚠️  MongoDB URI not configured — running in LIMITED mode.");
    console.warn("   Set MONGO_URI in backend/.env to enable full functionality.");
    console.warn("   Frontend demo login still works without MongoDB.\n");
    return;
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    console.warn("⚠️  Server running in LIMITED mode — DB features disabled.\n");
    // Don't exit — let server run for demo/local AI use
  }
};

export default connectDB;
