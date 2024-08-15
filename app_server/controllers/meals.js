const mealsEndpoint = 'http://localhost:3000/api/meals';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET meals page */
const meals = async function(req, res, next) {
    //console.log('MEALS CONTROLLER BEGIN');
    await fetch(mealsEndpoint, options)
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
                    message = 'No meals exist in our database';
                }
            }
            res.render('meals', {title: "Travlr Getaways", meals: json, message});
        })
        .catch(err => res.status(500).send(err.message));
    // console.log('MEALS CONTROLLER AFTER RENDER');
    
};

module.exports = {
    meals
};
