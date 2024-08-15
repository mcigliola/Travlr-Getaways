const roomsEndpoint = 'http://localhost:3000/api/rooms';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET rooms page */
const rooms = async function(req, res, next) {
    //console.log('ROOMS CONTROLLER BEGIN');
    await fetch(roomsEndpoint, options)
        .then(res => res.json())   
        .then(json => {
            //console.log(json);
            let message = null;
            if (!(json instanceof Array)) {
                message = 'API lookup error';
                json = [];
            }
            else {
                if (!json.length) {
                    message = 'No rooms exist in our database';
                }
            }
            res.render('rooms', {title: "Travlr Getaways", rooms: json, message});
        })
        .catch(err => res.status(500).send(err.message));
    // console.log('ROOMS CONTROLLER AFTER RENDER');
    
};

module.exports = {
    rooms
};
