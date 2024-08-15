const mongoose = require('mongoose');
const News = require('../models/news');  // Register model
const Model = mongoose.model('news');


// GET: /news - lists all news 
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsList = async(req, res) => {
    const q = await Model
        .find({}) // No filter, return all records
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        console.log(q);

    if (!q) {
        // Database returned no data
        const err = {message: "No data found"};
        return res
            .status(404)
            .json(err);
    }
    else {
        // Return resulting in news list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /news/:newsCode - lists a single news
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.newsCode}) // Return a single record
        .exec();

        // Uncomment the following line to show results of query
        // on the console
        // console.log(q);

    if (!q) {
        // Database returned no data
        const err = {message: "No data found"};
        return res
            .status(404)
            .json(err);
    }
    else {
        // Return resulting in news list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /news - Adds News
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsAddNews = async(req, res) => {
    const newNews = new News({
        type: req.body.type,
        code: req.body.code,
        title: req.body.title,
        date: req.body.date,
        author: req.body.author,
        image: req.body.image,
        link: req.body.link,
        content: req.body.content
    });

    const q = await newNews.save();

        if (!q) {
            // Database returned no data
            const err = {message: "No data found"};
            return res  
                .status(400)
                .json(err);
        }
        else {
            // Return new news
            return res
                .status(201)
                .json(q);
        }

        // Uncomment following line to show results in console
        //console.log(q);
};

// PUT: /news/:newsCode - Adds a new News
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const newsUpdateNews = async(req, res) => {
    // Uncomment for debugging
    //console.log(req.params);
    //console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
        { 'code' : req.params.newsCode },
        {
            type: req.body.type,
            code: req.body.code,
            title: req.body.title,
            date: req.body.date,
            author: req.body.author,
            image: req.body.image,
            link: req.body.link,
            content: req.body.content
        }
    )
    .exec();

    if(!q) { 
        // Database returned no data
        const err = {message: "No data found"};
        return res
            .status(400)
            .json(err);
    } 
    else { 
        // Return resulting updated news
        return res
            .status(201)
            .json(q);
    }
    
    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

module.exports = {
    newsList,
    newsAddNews,
    newsFindByCode,
    newsUpdateNews
};