// controllers/contactsController.js
exports.getAllContacts = (req, res) => {
	console.log("Request for all contacts received");
	res.send('{}');
};

exports.getContactById = (req, res) => {
	console.log("Request for a single contact received");
	res.send('{}');
};

exports.createContact = (req, res) => {
	console.log("Request to create a new contact received");
	const jsonData = req.body;
	console.log(jsonData);
	res.send(jsonData);
};
