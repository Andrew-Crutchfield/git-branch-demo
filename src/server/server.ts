import express from "express";
import indexRouter from "./routes";

const app = express();

app.use(express.json());

app.use(indexRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
