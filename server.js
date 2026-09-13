const dotenv = require("dotenv");
dotenv.config();
const app = require("./app");
const { connectMongoDB } = require("./mongoDB/mongo");

const DATABASE_URI = process.env.MONGO_URI;
const PORT = process.env.SERVER_PORT || 8000;

async function startServer() {
  try {
    await connectMongoDB(DATABASE_URI);

    app.listen(PORT, () => {
      console.log(`Server has started on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
}

startServer();
