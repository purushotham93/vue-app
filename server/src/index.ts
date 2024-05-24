// src/server.ts
import express from "express";
import cors from "cors";
import axios from "axios";
import { COVID_APIS } from "./constants/index";
import { CovidService } from "./covid-service";

const app = express();
const port = 3000;

app.use(cors());

const covidService = new CovidService();
app.get("/api/v1/covid-19/hospitals", async (req, res) => {
    const result = await covidService.getHospitals();
    res.send({...result?.data, status: result?.status});
});

app.get("/api/v1/covid-19/stats", async (req, res) => {
  const result = await covidService.getLatestCovidStatistics();
  res.send({...result?.data, status: result?.status});
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
