const Resource = require("../models/resource");
const io = require("../socket");

exports.createResource = async (req, res) => {
    try {
        const { name, description } = req.body;
        const newResource = new Resource({ name, description });
        const savedResource = await newResource.save();
        io.getIO().emit("resources", {
            action: "create",
            resource: savedResource,
        });
        res.json(savedResource);
    } catch (error) {
        console.error("Error creating resource:", error);
        res.status(500).json({ error: "Error creating resource" });
    }
};

exports.readResource = async (req, res) => {
    try {
        const { id } = req.params;
        const resource = await Resource.findById(id);
        if (!resource) {
            return res.status(404).json({ error: "Resource not found" });
        }
        res.json(resource);
    } catch (error) {
        console.error("Error reading resource:", error);
        res.status(500).json({ error: "Error reading resource" });
    }
};

exports.updateResource = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;
        const updatedResource = await Resource.findByIdAndUpdate(
            id,
            { name, description },
            { new: true }
        );
        if (!updatedResource) {
            return res.status(404).json({ error: "Resource not found" });
        }
        io.getIO().emit("resources", {
            action: "update",
            resource: updatedResource,
        });
        res.json(updatedResource);
    } catch (error) {
        console.error("Error updating resource:", error);
        res.status(500).json({ error: "Error updating resource" });
    }
};

exports.deleteResource = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedResource = await Resource.findByIdAndDelete(id);
        if (!deletedResource) {
            return res.status(404).json({ error: "Resource not found" });
        }
        res.json(deletedResource);
    } catch (error) {
        console.error("Error deleting resource:", error);
        res.status(500).json({ error: "Error deleting resource" });
    }
};

// Route to get paginated and sorted resources
exports.getResources = async (req, res) => {
    // Default to page 1 if not provided
    const page = parseInt(req.query.page) || 1;

    // Default to 10 items per page if not provided
    const limit = parseInt(req.query.limit) || 10;

    // Default to sort by name if not provided
    const sortField = req.query.sortField || "name";

    // Default to ascending order if not provided
    const sortOrder = req.query.sortOrder || "asc";

    try {
        const skip = (page - 1) * limit;
        const sortOptions = { [sortField]: sortOrder === "asc" ? 1 : -1 };

        const products = await Resource.find({})
            .sort(sortOptions)
            .skip(skip)
            .limit(limit)
            .exec();

        res.json(products);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Error fetching products" });
    }
};
