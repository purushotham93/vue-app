// src/server.ts
import express from "express";
import cors from "cors";
import axios from "axios";
import { COVID_APIS } from "./constants/index";

const app = express();
const port = 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/api/v1/covid-19/stats", async (req, res) => {
  const result = await axios.get(COVID_APIS.LATEST_STATS);
  console.log("data", result.data?.data);
  res.send(result.data?.data);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
