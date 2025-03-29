import express from "express";
import cors from "cors";
import apiRouter from './api'

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiRouter)

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});

