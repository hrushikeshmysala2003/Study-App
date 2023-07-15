const app = require("./app")


app.listen(process.env.PORT, () => {
    console.log(`Server id working on port: ${process.env.PORT}`);
})