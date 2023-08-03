const mongoose = require("mongoose");

const { Schema } = mongoose;

// Resource schema
const resourceSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);
