const express = require("express");
const { authenticateToken } = require("../middlewares/auth");
const { validateResourceInput } = require("../middlewares/validators");
const {
    createResource,
    readResource,
    updateResource,
    deleteResource,
    getResources,
} = require("../controllers/resourceController.js");
const cacheMiddleware = require("../middlewares/cache");

const router = express.Router();

// Middleware for JWT authentication
router.use(authenticateToken);

// CRUD endpoints for resources
router.post("/resources", validateResourceInput, createResource);
router.get("/resources/:id", cacheMiddleware, readResource);
router.put("/resources/:id", validateResourceInput, updateResource);
router.delete("/resources/:id", deleteResource);
router.get("/resources", cacheMiddleware, getResources);

module.exports = router;
