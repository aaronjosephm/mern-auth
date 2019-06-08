const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
// Load User model
const Event = require("../../models/Event");
// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/create_event", (req, res) => {
	Event
		.save()
		.then(event => res.json(event))
		.catch(err => console.log(err));
	});


module.exports = router;