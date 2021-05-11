
const { validationResult } = require('express-validator')
const User = require("../models/signupmodel")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
//get
exports.getuser = (req, res, next) => {
	res.send("Signup")
}

//post:
exports.createuser = async (req, res, next) => {
	try {
		const nutzer = req.body;
	
		const errors = validationResult(req)
	
		if (!errors.isEmpty()) {
		
			return res.status(422).json({
				fehlerBeiValidierung: errors.array()
			})
		}
	
		let schonVorhandenUser = await User.find({ email: nutzer.email })
		if (schonVorhandenUser.length >= 1) {
			return res.status(409).send('Es gib schon einen Nutzer mit dieser Email')
		}

		let passwortGehashed = await bcrypt.hash(nutzer.password, 10)
		let erstelleNutzer = await User.create({ ...nutzer, password: passwortGehashed })
		res.status(201).send(erstelleNutzer);

	} catch (fehler) {
		res.status(500).send('Da lief was schief!')
	}
}

