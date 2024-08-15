const newsEndpoint = 'http://localhost:3000/api/news';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
}

/* GET news page */
const news = async function(req, res, next) {
    //console.log('NEWS CONTROLLER BEGIN');
    await fetch(newsEndpoint, options)
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
                    message = 'No news exist in our database';
                }
            }
            res.render('news', {title: "Travlr Getaways", news: json, message});
        })
        .catch(err => res.status(500).send(err.message));
    // console.log('NEWS CONTROLLER AFTER RENDER');
    
};

module.exports = {
    news
};
