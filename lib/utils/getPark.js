const request = require('superagent');

function randomPark(body) {
  const parksArray = body.map(entry => ({ name: entry.name, url: entry.url }));
  return parksArray[Math.floor(Math.random() * parksArray.length)];
}

const getPark = async (zip) => {
  try {
    const response = await request
      .get(`https://api.yelp.com/v3/businesses/search?location=${zip}&categories=parks`)
      .set('Authorization', `Bearer ${process.env.YELP_KEY}`);
    
    const park = randomPark(response.body.businesses);
    // console.log(park.name);
    return park;

  } catch(e) {
    console.log(e);    
  }
  // return `Park near ${zip}`;
};

module.exports = { getPark };
