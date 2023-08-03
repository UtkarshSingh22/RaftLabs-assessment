const NodeCache = require("node-cache");

// Cache for 60 seconds (adjust as per your requirements)
const cache = new NodeCache({ stdTTL: 60 });

const cacheMiddleware = (req, res, next) => {
    // Use the URL as the cache key
    const key = req.originalUrl;

    // Check if the data is already cached
    const cachedData = cache.get(key);
    if (cachedData) {
        // Serve the data from cache
        return res.json(cachedData);
    }

    // If data is not cached, proceed to the route handler
    res.sendResponse = res.json;
    res.json = (data) => {
        // Cache the data for future requests
        cache.set(key, data);
        res.sendResponse(data);
    };

    next();
};

module.exports = cacheMiddleware;
