const expess = require("express");
require("dotenv").config();
const cors = require("cors");
require("colors");
const db_connection = require("./database/db_connection");
const userRoute = require("./routes/userRoute");
const authRoute = require("./routes/authRoute");
const errorHandler = require("./middleware/errorHandler");
const app = expess();
const port = process.env.PORT || 3000;
app.use(expess.json());
app.use(cors());
app.use("/api/users", userRoute);
app.use("/api/login", authRoute);
db_connection.sync();

// CUSTOM ERRORHANDLER MIDDLEWARE
app.use(errorHandler);

app.listen(port, () => `Server is running on port: ${port}`);
