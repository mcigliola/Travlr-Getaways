const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

console.log('Trips model in controller', Trip);

// GET: /trips - lists all trips
const tripsList = async (req, res) => {
    try {
      const trips = await Trip.find({}).exec();
      if (!trips) {
        return res.status(404).json({ message: 'trips not found' });
      }
      return res.status(200).json(trips);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

// GET: /trips/:tripCode - lists a single trip
const tripsFindByCode = async (req, res) => {
    try {
      const trip = await Trip.find({ code: req.params.tripCode }).exec();
      if (!trip) {
        return res.status(404).json({ message: `trip not found with code ${req.params.tripCode}` });
      }
      return res.status(200).json(trip);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
    try {
      const trip = await Trip.create({
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      });
      return res.status(201).json(trip);
    } catch (err) {
      return res.status(400).json(err);
    }
  };

// PUT: /trips/:tripCode - Updates a trip
const tripsUpdateTrip = async (req, res) => {
    try {
      const trip = await Trip.findOneAndUpdate(
        { code: req.params.tripCode },
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description,
        },
        { new: true }
      ).exec();
  
      if (!trip) {
        return res.status(404).send({ message: `Trip not found with code ${req.params.tripCode}` });
      }
      return res.status(200).json(trip);
    } catch (err) {
      return res.status(500).json(err);
    }
  };

// DELETE: /trips/:tripCode - delete a single trip
const tripsDeleteTrip = async (req, res) => {
    try {
      const trip = await Trip.findOneAndRemove({ code: req.params.tripCode }).exec();
  
      if (!trip) {
        return res.status(404).send({ message: `trip not found with code ${req.params.tripCode}` });
      }
      return res.status(200).send({ message: `trip ${req.params.tripCode} successfully deleted!` });
    } catch (err) {
      return res.status(500).json(err);
    }
  };

  const getUser = async (req, res, callback) => {
    if (req.payload && req.payload.email) {
      try {
        const user = await User.findOne({ email: req.payload.email }).exec();
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        callback(req, res, user.name);
      } catch (err) {
        console.log(err);
        return res.status(500).json(err);
      }
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  };

module.exports = {
    tripsList,
    tripsAddTrip,
    tripsFindByCode,
    tripsUpdateTrip,
    tripsDeleteTrip
};