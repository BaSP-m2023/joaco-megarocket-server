const express = require('express');
const fs = require('fs');
const classes = require('../data/class.json');

const router = express.Router();

router.get('/all', (req, res) => {
  res.send(classes);
});

router.get('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((classe) => classe.id.toString() === classId);
  if (foundClass) {
    res.send(foundClass);
  } else {
    res.send('Class id not found!');
  }
});

router.post('/new', (req, res) => {
  const newClass = req.body;
  classes.push(newClass);
  fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
    if (err) {
      res.send('User cannot be created');
    } else {
      res.send('User created successfully!');
    }
  });
});

router.delete('/:id', (req, res) => {
  const classId = req.params.id;
  const filteredClasses = classes.filter((classe) => classe.id.toString() !== classId);
  const newClass = req.body;
  classes.push(newClass);
  fs.writeFile('src/data/class.json', JSON.stringify(filteredClasses, null, 2), (err) => {
    if (err) {
      res.send('User cannot be deleted');
    } else {
      res.send('User deleted!');
    }
  });
});

module.exports = router;

// console.log('Class JS');
