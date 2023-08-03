const express = require("express");
const resourceRoutes = require("./resource");
const authRoutes = require("./auth");

const router = express.Router();

router.use("/", authRoutes);
router.use("/", resourceRoutes);

module.exports = router;
