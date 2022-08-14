const path = require('path');
const express = require('express');

const port = 3000;
const app = express();

const publicPath = path.join(__dirname, '../..', 'build');
const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(createProxyMiddleware('/v1', {
    target: "http://localhost:3200",
    changeOrigin: true
}));

app.use(express.static(publicPath));

app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
});

app.listen(port, () => {
    console.log(`Web Server started on port ${port}`);
});
