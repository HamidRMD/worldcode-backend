const User  = require("../models/signupmodel")

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

//get

  exports.getlogin = (req, res, next) => {

	User.find().then((ergebnis) => {
		res.status(200).send(ergebnis)
	}).catch(
		(fehler) => {
			res.status(500).send(fehler);
		}
	);
}

  exports.postlogin = async (req, res, next) => {
	let nutzer = req.body
	try {
	
		let userVonDatenbank = await User.findOne({ email: nutzer.email })
		console.log(userVonDatenbank);
	
		if (userVonDatenbank === null) {
			return res.status(401).send('Du konntest nicht eingeloggt werden')
		}

		let vergleichVonPasswort = await bcrypt.compare(nutzer.password, userVonDatenbank.password)
		
		if (vergleichVonPasswort) {

			let token = jwt.sign({
				email: userVonDatenbank.email,
				userId: userVonDatenbank._id,
			}, process.env.JWT || 'ein Geheimnis', {expiresIn: '3h'})
			res.status(200).json({
				nachricht: 'Du bist eingeloggt',
				token: token
			})
		} else {
			res.status(401).send('Du konntest nicht eingeloggt werden')
		}
	} catch (error) {
		res.status(401).send('Du konntest nicht eingeloggt werden')
	}
}
  