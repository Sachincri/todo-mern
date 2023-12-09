import { app } from "./app.js";
import { connectDB } from "./db/database.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`);
});
