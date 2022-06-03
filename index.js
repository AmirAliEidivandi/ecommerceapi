const connectDB = require("./db/connect");
const usersRouter = require("./routes/users.routes");
const errorHandleMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

require("dotenv").config();
const express = require("express");
const app = express();

// middleware
app.use(express.json());

app.use("/api/v1/user", usersRouter);
app.get("/", (req, res) => res.send("Hello World!"));

// error handle
app.use(errorHandleMiddleware);
app.use(notFound);

const port = 3000;
const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Example app listening on port ${port}!`));
    } catch (error) {
        console.log(error);
    }
};

start();
