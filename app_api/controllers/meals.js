const mongoose = require('mongoose');
const Meal = require('../models/meal');  // Register model
const Model = mongoose.model('meals');

// GET: /meals - lists all meals
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        // Return resulting in meal list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /meals/:mealCode - lists a single meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.mealCode}) // Return a single record
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);

    if (!q) {
        // Database returned no data
        return res
            .status(404)
            .json(err);
    }
    else {
        // Return resulting in meal list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /meals - Adds a new Meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsAddMeal = async(req, res) => {
    const newMeal = new Meal({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
    });

    const q = await newMeal.save();

        if (!q) {
            // Database returned no data
            return res  
                .status(400)
                .json(err);
        }
        else {
            // Return new meal
            return res
                .status(201)
                .json(q);
        }

        // Uncomment following line to show results in console
        //console.log(q);
};

// PUT: /meals/:mealCode - Adds a new Meal
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const mealsUpdateMeal = async(req, res) => {
    // Uncomment for debugging
    //console.log(req.params);
    //console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
        { 'code' : req.params.mealCode },
        {
            code: req.body.code,
            name: req.body.name,
            length: req.body.length,
            start: req.body.start,
            resort: req.body.resort,
            perPerson: req.body.perPerson,
            image: req.body.image,
            description: req.body.description
        }
    )
    .exec();

    if(!q) { 
        // Database returned no data
        return res
            .status(400)
            .json(err);
    } 
    else { 
        // Return resulting updated meal
        return res
            .status(201)
            .json(q);
    }
    
    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

module.exports = {
    mealsList,
    mealsAddMeal,
    mealsFindByCode,
    mealsUpdateMeal
};