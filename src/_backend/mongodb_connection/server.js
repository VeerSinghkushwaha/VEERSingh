//server.js file
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("../mongodb_connection/db_configu.js");

// routes of api
const userRouter = require("../mongodb_connection/api_route/user_route.js");
const ticket_router = require("../mongodb_connection/api_route/tkt_route.js");
const img_router = require("../mongodb_connection/api_route/img.route.js");
const formId_router = require("../mongodb_connection/api_route/formId_route.js");
const tenant_router = require("../mongodb_connection/api_route/tenant.route.js");
const message_router = require("../mongodb_connection/api_route/message_route.js");
const master_router = require("../mongodb_connection/api_route/e-master.route.js");
const userStatus_router = require("../mongodb_connection/api_route/userStatus_route.js");

const app = express();
app.use(bodyParser.json());

// connection the mongodb port 27017
app.use(cors({ origin: "http://localhost:4200" }));

// Setup session middleware
// app.use(session({
//   secret: 'your secret',
//   resave: false,
//   saveUninitialized: true,
//   store: store
// }));

const PORT = process.env.PORT || 3000;
// connection port 3000
app.listen(PORT, () => {
  console.log("server start at  port 3000 ${{Port}}");
});

app.use("/usersdata", userRouter);
app.use("/ticketsdata", ticket_router);
app.use("/imagedata", img_router);
app.use("/formId", formId_router);
app.use("/tenant", tenant_router);
app.use("/messagedata", message_router);
app.use("/emasterdata", master_router);
app.use("/loginData", userStatus_router);
// app.use('/logout',userStatus_router)
