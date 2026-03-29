// controllers/contactsController.js

//
// I guess try to make a connection to the database?
//

const pool = require('../db.js');

exports.getAllContacts = async (req, res) => {
	console.log("Request for all contacts received");
	const result = await pool.query('SELECT * FROM contacts');
	res.status(200).json(result.rows);
};

exports.getContactById = async (req, res) => {
	console.log("Request for a single contact with id " + req.params.id + " received");
	try {
		const result = await pool.query("SELECT * FROM contacts WHERE id = $1", [req.params.id]);

		if (result.rows.length === 0) {
			return res.status(404).send();
		}

		res.status(200).json(result.rows[0]);

	} catch (err) {
		console.log(err);
		res.status(500).send();
	}
};

exports.createContact = (req, res) => {
	console.log("Request to create a new contact received");
	const jsonData = req.body;
	console.log(jsonData);
	res.send(jsonData);
};
