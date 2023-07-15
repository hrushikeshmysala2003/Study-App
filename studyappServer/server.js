const app = require("./app")
const connectDB = require("./config/database");


connectDB();
app.listen(process.env.PORT, () => {
    console.log(`Server id working on port: ${process.env.PORT}`);
})