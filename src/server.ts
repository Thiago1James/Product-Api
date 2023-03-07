import bodyParser from "body-parser";
import express from "express";
import routes from "./routes";
import cors from "cors";
const app = express();
const PORT = process.env.PORT || 3001;
import * as dotenv from "dotenv";
dotenv.config();
app.use(cors());

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(routes);
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
