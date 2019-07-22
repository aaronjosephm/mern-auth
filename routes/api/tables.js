const express = require("express");
const router = express.Router();
const Table = require("../../models/Table");
const validateNewTableInput = require("../../validation/table");

router.post("/new", (req, res) => {
	const { errors, isValid } = validateNewTableInput(req.body);
	const { name, status, gameType } = req.body;

	if (!isValid) {
		return res.status(400).json(errors)
	}

	const newTable = new Table({
		name: req.body.name,
		status: req.body.status,
		gameType: req.body.gameType
	});

	newTable.save()
	  .then(table => res.json(table))
	  .catch(err => console.log(err));
});

router.post("/index", (req, res) => {
	Table.find({})
		.then(tables => res.json(tables))
		.catch(err => console.log(err));
})

router.get("/table", (req, res) => {
	Table.all();
})

module.exports = router;