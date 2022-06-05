const connectDB = require("./db/connect");
const usersRouter = require("./routes/users.routes");
const productRouter = require("./routes/product.routes");
const cartRouter = require("./routes/cart.routes");
const orderRouter = require("./routes/order.routes");
const authRouter = require("./routes/auth.routes");
const stripeRouter = require("./routes/stripe.routes");
const errorHandleMiddleware = require("./middleware/error-handler");
const notFound = require("./middleware/not-found");

require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");

// middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/users", usersRouter);
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/chekout", stripeRouter);
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
