const express = require('express');
const {animals} = require('../data/animals')
const fs = require('fs');
const path = require('path');

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

createNewAnimal = (body, animalsArray) => {
  const animal = body;
  animalsArray.push(animal);
  fs.writeFileSync(
      path.join(__dirname, '../data/animals.json'),
      JSON.stringify({animals: animalsArray}, null, 2)
  );
  return animal;
};

validateAnimal = animal => {
    if (!animal.name || typeof animal.name !== 'string') {
        return false;
    }
    if ( !animal.species || typeof animal.species !== 'string') {
        return false
    }
    if ( !animal.diet || typeof animal.diet !== 'string') {
        return false
    }
    if (!animal.personalityTraits || !Array.isArray(animal.personalityTraits)) {
        return false;
      }
      return true;
}

router.get('/animals', (req, res) =>{
    let results = animals
    if(req.query) {
        results = filterByQuery(req.query, results);
    }
    res.json(results);
});

router.get('/animals/:id', (req, res)  =>{
    let result = findById(req.params.id, animals);
    if(result) {
        res.json(result);
    } else {
        res.send(404);
    }
});

router.post('/animals', (req, res) => {
    req.body.id = animals.length.toString();
    if (!validateAnimal(req.body)) {
        res.status(400).send('The animal is not properly formatted.');
    } else {
        const animal = createNewAnimal(req.body, animals);
        res.json(animal);
    }
})







module.exports = router