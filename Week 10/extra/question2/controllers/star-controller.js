const fs = require("fs/promises");

// Get Service model
const Kstar = require("./../models/star-model");

// Controller function to get all the documents in the db and display it
exports.displayForm = async (req, res) => {
  try {
    const stars = await Kstar.retrieveAll();
    res.render('display', { stars });
  } catch (error) {
    res.render('display', { stars: [] });
  }
};

/* getStar reads the url and get the id from the url and call
findById(id ) and display the result in edit-headline.ejs with a editable
headline. */
exports.getStar = async (req, res) => {
  const id = req.query.id;
  try {
    const star = await Kstar.findById(id);
    res.render('edit-headline', { 
      star: star || null, 
      success: null,      // Always defined
      error: null 
    });
  } catch (error) {
    res.render('edit-headline', { 
      star: null, 
      success: null, 
      error: 'Error loading star' 
    });
  }
};

/* updateHeadline gathers the id and headline from the
 edit-headline.ejs and use method editHeadline(id,headline)
 to update the database and send a success/not successful
 status to the screen.*/
exports.updateHeadline = async (req, res) => {
  const id = req.body.id;
  const headline = req.body.headline;
  try {
    const success = await Kstar.editHeadline(id, headline);
    res.render('edit-headline', { 
      star: null, 
      success: success ? 'Headline has been successfully updated!' : null,
      error: success ? null : 'Update failed'
    });
  } catch (error) {
    res.render('edit-headline', { 
      star: null, 
      success: null, 
      error: 'Update failed' 
    });
  }
};




