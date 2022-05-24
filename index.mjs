import express from "express";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import dotenv from "dotenv";

dotenv.config();

const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:3000";

const app = express();
app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  })
);
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public"));
app.use(express.json());

const PORT = process.env.PORT || 3004;
app.listen(PORT);
