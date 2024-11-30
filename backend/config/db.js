const mongoose = require("mongoose");

const connectDB = async () => {
    const conn = await mongoose.connect(
        "mongodb+srv://aadipersonal36:Aadithyakp@cluster0.q4ok1ir.mongodb.net/issues_db?retryWrites=true&w=majority&appName=Cluster0"
    );

    console.log(`MongoDB connected ${conn.connection.host}`);
};

module.exports = connectDB;
