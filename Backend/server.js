const http = require('http');
const app = require('./app');
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 4000;

const server = http.createServer(app);

// Initialize socket.io
initializeSocket(server);

server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
// This code creates an HTTP server using the Express app and listens on a specified port.