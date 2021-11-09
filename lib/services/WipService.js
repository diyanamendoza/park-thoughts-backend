
const Profile = require('../models/Profile');
const { getPark } = require('../utils/getPark.js');
const { getQuote } = require('../utils/getQuote.js');
const { sendWipEmail } = require('../utils/sendWipEmail.js');

module.exports = class WipService {
  static async makeProfile(email, zipcode) {

    const park = await getPark(zipcode);
    const quote = await getQuote();
    const message = `Here is your quote for today: ${quote}. Consider contemplating that while exploring this nearby park: ${park.name}.`;
    console.log(message);
    //NOTE: FIGURE OUT HOW TO HREF THE PARK INSIDE THE MESSAGE
    await sendWipEmail(email, message);

    const userExists = await Profile.getByEmail(email);
    // console.log(userExists);

    if (userExists) {
      return await Profile.updateProfile(park.name, quote, zipcode, email);
    } else {
      return await Profile.insertUser(park.name, quote, email, zipcode);
    }
  }
};
