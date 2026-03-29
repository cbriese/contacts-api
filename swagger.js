const swaggerJSDoc = require('swagger-jsdoc');

const PORT = process.env.PORT || 3000;
const SERVER_NAME = process.env.SERVER_NAME;

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Contacts API',
			version: '1.0.0',
			description: 'A simple API to manage contacts with Swagger documentation',
		},
		servers: [
			{
				url: `https://${SERVER_NAME}:${PORT}`,
				description: 'Local development server',
			},
		],
	},
	apis: ['./routes/*.js'], // Path to the API route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
