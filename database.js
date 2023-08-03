const mongoose = require("mongoose");

exports.connectToDatabase = async () => {
    try {
        const dbURI = process.env.MONGODB_URI;
        await mongoose.connect(dbURI, {});
        console.log("Connected to the database");
    } catch (error) {
        console.error("Database connection failed:", error);
    }
};
