import express from "express";
import cors from "cors";
import router from "./routes/route.js";
import connect from "./dbConnect.js";

const app = express();
const corsConfig = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "Access-Control-Allow-Origin",
  ],
};

app.use(express.json());
app.use(cors(corsConfig));

app.use("/api", router);

const PORT = 8080 || process.env.PORT;

// http get request
app.get("/", (req, res) => {
  res.status(201).json({
    msg: "running perfectly",
  });
});

connect()
  .then(() => {
    try {
      app.listen(PORT, () => {
        console.log(`app running on http://localhost:${PORT}`);
      });
    } catch (error) {
      console.log(error);
      console.log("Can't connect to the server");
    }
  })
  .catch((e) => {
    console.log(e + "\nInvalid database connection");
  });
