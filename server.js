const app = require("./app.js");

// Default Ports
const PORT = process.env.PORT || 5005;

async function startServer() {
    // initiailze db

    // Start server on default port or in custom port
    app.listen(PORT, () => {
        console.log(`Database is Connected`);
        console.log(`Server is running on PORT: ${PORT}`);
    });
}

startServer();
