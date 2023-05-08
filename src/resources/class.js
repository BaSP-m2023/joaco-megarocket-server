/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
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
      res.send('Class cannot be created');
    } else {
      res.send('Class created successfully!');
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
      res.send('Class cannot be deleted');
    } else {
      res.send('Class deleted!');
    }
  });
});

router.put('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((classe) => classe.id.toString() === classId);
  const updateClass = req.body;
  if (foundClass) {
    classes.forEach((classe) => {
      if (classe.id.toString() === classId) {
        classe.class_title = updateClass.class_title ? updateClass.class_title : classe.class_title;
        classe.related_activity = updateClass.related_activity ? updateClass.related_activity : classe.related_activity;
        classe.difficulty = updateClass.difficulty ? updateClass.difficulty : classe.difficulty;
        classe.assigned_coach = updateClass.assigned_coach ? updateClass.assigned_coach : classe.assigned_coach;
        classe.space_available = updateClass.space_available ? updateClass.space_available : classe.space_available;
        classe.date = updateClass.date ? updateClass.date : classe.date;
        classe.start_time = updateClass.start_time ? updateClass.start_time : classe.start_time;
        classe.end_time = updateClass.end_time ? updateClass.end_time : classe.end_time;
        classe.recurrence = updateClass.recurrence ? updateClass.recurrence : classe.recurrence;

        res.json({ msg: 'Class edited successfully', classe });
      }
    });
  } else {
    res.status(400).json({ msg: `No class winth that ID ${classId}` });
  }
});

module.exports = router;
