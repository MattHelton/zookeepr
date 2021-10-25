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

findById = (id, animalsArray) => {
    const result = animalsArray.filter(animal => animal.id === id)[0];
    return result
}
router.get('/animals', (req, res) =>{
    let results = animals
    console.log(req.query)
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res)  =>{
    const result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});







module.exports = router