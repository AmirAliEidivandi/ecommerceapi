const connectDB = require("./db/connect");
const usersRouter = require("./routes/users.routes");

require("dotenv").config();
const express = require("express");
const app = express();

app.use(express.json());

// error handle
const errorHandleMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

app.use("/api", usersRouter);
app.get("/", (req, res) => res.send("Hello World!"));

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
