const mongoose = require('mongoose');
const Room = require('../models/room');  // Register model
const Model = mongoose.model('rooms');

// GET: /rooms - lists all rooms
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsList = async(req, res) => {
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
        // Return resulting in room list
        return res
            .status(200)
            .json(q);
    }
};

// GET: /rooms/:roomCode - lists a single room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsFindByCode = async(req, res) => {
    const q = await Model
        .find({'code' : req.params.roomCode}) // Return a single record
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
        // Return resulting in room list
        return res
            .status(200)
            .json(q);
    }
};

// POST: /rooms - Adds a new Room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsAddRoom = async(req, res) => {
    const newRoom = new Room({
        code: req.body.code,
        name: req.body.name,
        image: req.body.image,
        description: req.body.description,
        rate: req.body.rate
    });

    const q = await newRoom.save();

        if (!q) {
            // Database returned no data
            return res  
                .status(400)
                .json(err);
        }
        else {
            // Return new room
            return res
                .status(201)
                .json(q);
        }

        // Uncomment following line to show results in console
        //console.log(q);
};

// PUT: /rooms/:roomCode - Adds a new Room
// Regardless of outcome, response must include HTML status code
// and JSON message to the requesting client
const roomsUpdateRoom = async(req, res) => {
    // Uncomment for debugging
    //console.log(req.params);
    //console.log(req.body);

    const q = await Model
        .findOneAndUpdate(
        { 'code' : req.params.roomCode },
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
        // Return resulting updated room
        return res
            .status(201)
            .json(q);
    }
    
    // Uncomment the following line to show results of operation
    // on the console
    // console.log(q);
};

module.exports = {
    roomsList,
    roomsAddRoom,
    roomsFindByCode,
    roomsUpdateRoom
};