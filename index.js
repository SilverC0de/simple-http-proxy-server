const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
require("dotenv").config();

// Create Express Server
const app = express();

// Configuration
const { PORT, HOST, SERVICE_URL } = process.env;

// Proxy requests
app.use(
	"/paxful",
	createProxyMiddleware({
		target: SERVICE_URL,
		changeOrigin: true,
        pathRewrite: {
            [`^/paxful`]: '',
        },
	})
);

// Other routes
app.all('*', (request, response) => {
    response.status(404).send('Not found')
});

// Starting our Proxy server
app.listen(PORT, HOST, () => {
	console.log(`Simple proxy running on port ${PORT}`);
});
