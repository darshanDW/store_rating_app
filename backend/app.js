require("dotenv").config();
require("reflect-metadata");
const dotenv= require("dotenv");
dotenv.config();
const express = require("express");
const cors = require("cors");
const { createConnection } = require("typeorm");
const ormconfig = require("./ormconfig");

const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/users");
const storeRoutes = require("./routes/stores");
const ratingRoutes = require("./routes/ratings");

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/ratings', ratingRoutes);

createConnection(ormconfig).then(() => {
  app.listen(process.env.PORT || 4000, () => console.log(`Backend running on http://localhost:${process.env.PORT || 4000}`));
}).catch(err => console.error(err));