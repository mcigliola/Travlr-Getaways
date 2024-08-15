const express = require('express');  // Express app
const router = express.Router();  // Router logic
const {expressjwt: jwt} = require('express-jwt');

// This is where we import the controllers we will route
const tripsController = require('../controllers/trips');
const roomsController = require('../controllers/rooms');
const mealsController = require('../controllers/meals');
const newsController = require('../controllers/news');
const authController = require('../controllers/authentication');

const auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload',
    algorithms: ["HS256"]
});

// Define route for registration endpoint
router
    .route('/register')
    .post(authController.register);

// Define route for login endpoint
router  
    .route('/login')
    .post(authController.login);

// Define route for homepage
router
    .route('/index');

// Define route for contact page
router
    .route('/contact');

// Define route for about page
    router
    .route('/about');

// define route for our trips endpoint
router
    .route('/trips')
    .get(tripsController.tripsList) // GET Method routes tripList
    .post(auth, tripsController.tripsAddTrip) // POST Method adds a trip
    .put(auth, tripsController.tripsUpdateTrip); // PUT Method updates a trip

// GET Method routes tripsFindByCode - requires parameter
router
    .route('/trips/:tripCode')
    .get(tripsController.tripsFindByCode)
    .put(auth, tripsController.tripsUpdateTrip);

// define route for our rooms endpoint
router
    .route('/rooms')
    .get(roomsController.roomsList) // GET Method routes roomList
    .post(auth, roomsController.roomsAddRoom) // POST Method adds a room
    .put(auth, roomsController.roomsUpdateRoom); // PUT Method updates a room

// GET Method routes roomsFindByCode - requires parameter
router
    .route('/rooms/:roomCode')
    .get(roomsController.roomsFindByCode)
    .put(auth, roomsController.roomsUpdateRoom);

// define route for our meals endpoint
router
    .route('/meals')
    .get(mealsController.mealsList) // GET Method routes mealList
    .post(auth, mealsController.mealsAddMeal) // POST Method adds a meal
    .put(auth, mealsController.mealsUpdateMeal); // PUT Method updates a meal

// GET Method routes mealsFindByCode - requires parameter
router
    .route('/meals/:mealCode')
    .get(mealsController.mealsFindByCode)
    .put(auth, mealsController.mealsUpdateMeal);

// define route for our news endpoint
router
    .route('/news')
    .get(newsController.newsList) // GET Method routes newsCategorized
    .post(auth, newsController.newsAddNews) // POST Method adds a news
    .put(auth, newsController.newsUpdateNews); // PUT Method updates a news

// GET Method routes newsFindByCode - requires parameter
router
    .route('/news/:newsCode')
    .get(newsController.newsFindByCode)
    .put(auth, newsController.newsUpdateNews);

    
module.exports = router;