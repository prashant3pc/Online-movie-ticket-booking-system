import app from "./app.js";
import "dotenv/config";
import connectDB from "./config/db.js";
connectDB();
const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port $(PORT)`);
});
