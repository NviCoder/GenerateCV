import express from "express";
import { api } from "./api";

const cors = require("cors");

const app = express();

app.use(
    cors({
        credentials: true,
        origin: true,
    })
);

app.use(api);

app.listen(3002, () => console.log("Server started"));
