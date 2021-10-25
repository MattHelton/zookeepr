const express = require('express');
const {animals} = require('../data/animals')

const router = express.Router()

filterByQuery = (query, animalsArray) => {
  let filteredResults = animalsArray;
  let personalityTraitsArray = [];
  if(query.personalityTraits) {
      if(typeof query.personalityTraits === 'string') {
          personalityTraitsArray=[query.personalityTraits];
      } else {
          personalityTraitsArray = query.personalityTraits;
      }
      personalityTraitsArray.forEach(trait => {
          filteredResults = filteredResults.filter(
              animal => animal.personalityTraits.indexOf(trait) !== -1
          );
      });
  }
  if (query.diet) {
      filteredResults = filteredResults.filter(animal => animal.diet === query.diet);
  }
  if (query.species) {
      filteredResults = filteredResults.filter(animal => animal.species === query.species);
  }
  if (query.name) {
      filteredResults = filteredResults.filter(animal => animal.name === query.name);
  }
  return filteredResults;
};

router.get('/animals', (req, res) =>{
    let results = animals
    console.log(req.query)
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});







module.exports = router