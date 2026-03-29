const PORT = process.env.PORT || 3000;
module.exports = PORT
const https = require('https');
const express = require('express');
const session = require('express-session');
const redis = require('redis');
const connectRedis = require('connect-redis');
const fs = require('fs');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger.js');
const contactsRoutes = require('./routes/contactsRoutes');

const app = express();

// Enable CORS for all origins
app.use(cors());
app.use(express.json());

app.get('/api/status', (req, res) => {
	console.log('Request received');
	res.json({ status: 'Running', timestamp: new Date().toISOString() });
});

app.use('/api/contacts', contactsRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

const privateKey = fs.readFileSync('/etc/ssl/server.key', 'utf8');
const certificate = fs.readFileSync('/etc/ssl/server.crt', 'utf8');
const credentials = {key: privateKey, cert: certificate};

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(PORT, () => {
	console.log(`HTTPS Server running on port ${PORT}`);
});

