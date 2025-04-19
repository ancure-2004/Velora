const http = require('http');
const app = require('./app'); // Import the Express app from app.js
const port = process.env.PORT || 3000; // Set the port to listen on

const server = http.createServer(app); // Create an HTTP server using the Express app

server.listen(port, () => { // Start the server and listen on the specified port
    console.log(`Server is running on http://localhost:${port}`); // Log the server URL to the console
});
// This code creates an HTTP server using the Express app and listens on a specified port.