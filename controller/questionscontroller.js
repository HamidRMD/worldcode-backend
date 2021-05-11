
const question = require('../models/questions');
const { validationResult } = require('express-validator')

exports.getquestion = (req, res, next) => {
	
	question.find().then(
		(ergebnis) => {
			console.log("questionlength=",question.length)
			res.status(200).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send("Fehler : "+fehler);
	});
}


exports.postquestion = (req, res, next) => {
  console.log("post=",req.body);
	const questions = req.body;
	const errors = validationResult(req)
	
		if (!errors.isEmpty()) {
		
			return res.status(422).json({
				fehlerBeiValidierung: errors.array()
			})
		}
console.log("questions=",questions)
	question.create(questions).then(
		(ergebnis) => {
			res.status(201).send(ergebnis);
		}
	).catch( (fehler) => {
		res.status(500).send("Fehler bei create(): "+fehler);
	});
}
exports.löschfrage = (req, res, next) => {
	const { _id } = req.params;

	question.deleteOne({ _id }).then(
		(ergebnis) => {
			res.status(200).send(ergebnis);
		}
	).catch(
		(fehler) => {
			res.status(500).send({ message: "Fehler bei DELETE /users/_id", objekt: fehler })
		}
	)
}

exports.GetRandomQuestion = (req, res, next) => {
	
	//für Allgemeine Bundesländer
		question.find({stats:"Allgemein"}).then((ergebnis)=>{
			var newItems = [];
			for (var i = 0; i < 30; i++) {
				var randomzahl = Math.floor(Math.random() * ergebnis.length);
				
				console.log("randomzahl=",randomzahl)
				newItems.push(ergebnis[randomzahl]);
			  
				ergebnis.splice(randomzahl, 1);
				
				console.log("item=",ergebnis)
	
			
			  }
			  console.log("lenghth=",newItems.length)
			  
			  res.status(200).send(newItems);
		})
		
			
	}
	exports.StatsQuestion = (req, res, next) => {
		// 10 fragen für bestimmte Bundesländer
	
		const { stats} = req.params;
	console.log("land=",stats)
		question.find({ stats }).then((ergebnis)=>{
			var newStats = [];
			for (var i = 0; i < 10; i++) {
				var randomzahl = Math.floor(Math.random() * ergebnis.length);
				
				console.log("randomzahl=",randomzahl)
				newStats.push(ergebnis[randomzahl]);
			  
				ergebnis.splice(randomzahl, 1);
				
				console.log("item=",ergebnis)
	
			
			  }
			  console.log("newStatslenghth=",newStats.length)
			  
			  res.status(200).send(newStats);
		})
	}
		