const express = require('express');
const router = express.Router();
const contactsController = require('../controllers/contactsController');

/**
 * @swagger
 * /api/contacts:
 *   get:
 *     summary: Returns a list of contacts
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/', contactsController.getAllContacts);

/**
 * @swagger
 * /api/contacts/{id}:
 *   get:
 *     summary: Return a single contact identified by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Numeric ID of the contact to retrieve
 *     tags: [Contacts]
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/:id', contactsController.getContactById);

/**
 * @swagger
 * /api/contacts:
 *   post:
 *     summary: Create a new contact
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: John
 *                 required: true
 *               last_name:
 *                 type: string
 *                 example: Smith
 *                 required: true
 *               address_1:
 *                 type: string
 *                 example: 1234 Main St.
 *               address_2:
 *                 type: string
 *                 example: Apt 2
 *               city:
 *                 type: string
 *                 example: Springfield
 *               state:
 *                 type: string
 *                 example: IL
 *               zip_code:
 *                 type: string
 *                 example: 12345
 *               phone_1:
 *                 type: string
 *                 example: 800-555-1234
 *               phone_2:
 *                 type: string
 *                 example: 800-555-1234
 *               email_1:
 *                 type: string
 *                 example: john.smith@domain.xyz
 *               email_2:
 *                 type: string
 *                 example: john.smith@domain.xyz
 *               birthday:
 *                 type: date
 *                 example: 07/04/1999
 *     tags: [Contacts]
 *     parameters:
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/', contactsController.createContact);

module.exports = router;
