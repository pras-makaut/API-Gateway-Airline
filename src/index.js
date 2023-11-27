const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const rateLimit = require('express-rate-limit');
const {ServerConfig} = require('./config');
const apiRoutes = require('./routes');

const app = express();
const limiter = rateLimit({
	windowMs: 2 * 60 * 1000, // 2 minutes
	limit: 30, // Limit each IP to 3 requests per `window` (here, per 15 minutes).
})

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(limiter);
app.use('/flightsService', createProxyMiddleware({ target: ServerConfig.FLIGHT_SERVICE, changeOrigin: true }));
app.use('/bookingsService', createProxyMiddleware({ target: ServerConfig.BOOKING_SERVICE, changeOrigin: true }));
app.use('/api',apiRoutes);
app.listen(ServerConfig.PORT,()=>{
    console.log(`Successfully started the server on PORT : ${ServerConfig.PORT}`);
})

