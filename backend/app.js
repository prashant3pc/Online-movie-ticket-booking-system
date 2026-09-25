import express from "express";
import userRoutes from "./routes/userRoutes.js";
import movieRoutes from "./routes/movieRoutes.js";
import theatreRoutes from "./routes/theatreRoutes.js";
import errorHandler from "./middlewares/errorHandler.js";
const app = express();

app.use(express.json());

app.use(userRoutes);
app.use(movieRoutes);
app.use(theatreRoutes);
app.get("/", (req, res) => {
  res.send("server is running");
});

app.use(errorHandler);
export default app;
