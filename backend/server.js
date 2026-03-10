const app = require("./src/app");
const connectToDB = require("./src/config/db");

// Connect to the database
connectToDB();

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
