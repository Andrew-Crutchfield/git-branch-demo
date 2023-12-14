import express from "express";
import blogsRouter from "./blogs";

const indexRouter = express.Router();

indexRouter.use("/api/blogs", blogsRouter);

export default indexRouter;
