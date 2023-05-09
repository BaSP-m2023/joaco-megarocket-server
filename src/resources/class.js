/* eslint-disable no-param-reassign */
/* eslint-disable consistent-return */
/* eslint-disable max-len */
const express = require('express');
const fs = require('fs');
const classes = require('../data/class.json');

const router = express.Router();

router.get('/all', (req, res) => {
  res.status(200).json({ msg: 'All classes found successfully', classes });
});

router.get('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((classe) => classe.id.toString() === classId);
  if (foundClass) {
    res.status(200).json({ msg: 'Class found successfully', foundClass });
  } else {
    res.status(400).json({ msg: `Class not found, Id: ${classId}` });
  }
});

router.post('/new', (req, res) => {
  const lastClassesId = classes[classes.length - 1].id;
  const newClass = {
    id: lastClassesId + 1,
    class_title: req.body.class_title,
    related_activity: req.body.related_activity,
    difficulty: req.body.difficulty,
    assigned_coach: req.body.assigned_coach,
    space_available: req.body.space_available,
    assigned_place: req.body.assigned_place,
    date: req.body.date,
    start_time: req.body.start_time,
    end_time: req.body.end_time,
    recurrence: req.body.recurrence,
  };

  if (!newClass.class_title || !newClass.related_activity || !newClass.difficulty || !newClass.assigned_coach
    || !newClass.space_available || !newClass.assigned_place || !newClass.date || !newClass.start_time
    || !newClass.end_time || !newClass.recurrence) {
    return res.status(400).json({ msg: 'You must complete all the attributes to create a new class' });
  }

  classes.push(newClass);
  fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
    if (err) throw err;
    res.status(200).json({ msg: 'Class created successfully', newClass });
  });
});

router.delete('/:id', (req, res) => {
  const classId = req.params.id;
  const foundClass = classes.find((classe) => classe.id.toString() === classId);
  const filteredClasses = classes.filter((classe) => classe.id.toString() !== classId);

  if (!foundClass) {
    return res.status(400).json({ msg: `Class could not be deleted. No classes found with the Id: ${classId}` });
  }

  fs.writeFile('src/data/class.json', JSON.stringify(filteredClasses, null, 2), (err) => {
    if (err) throw err;
    res.status(200).json({ msg: 'Class deleted successfully', filteredClasses });
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
        classe.assigned_place = updateClass.assigned_place ? updateClass.assigned_place : classe.assigned_place;
        classe.date = updateClass.date ? updateClass.date : classe.date;
        classe.start_time = updateClass.start_time ? updateClass.start_time : classe.start_time;
        classe.end_time = updateClass.end_time ? updateClass.end_time : classe.end_time;
        classe.recurrence = updateClass.recurrence ? updateClass.recurrence : classe.recurrence;

        fs.writeFile('src/data/class.json', JSON.stringify(classes, null, 2), (err) => {
          if (err) throw err;
          res.status(200).json({ msg: 'Class edited successfully', classe });
        });
      }
    });
  } else {
    res.status(400).json({ msg: `No classes found with the Id: ${classId}` });
  }
});

router.get('/classtitle/:class_title', (req, res) => {
  const classTitle = req.params.class_title;
  const foundClassTitle = classes.filter((classe) => classe.class_title.toLowerCase().indexOf(classTitle.toLowerCase()) > -1);

  if (foundClassTitle.length === 0) {
    return res.status(400).json({ msg: 'Class title not found, please try again' });
  }

  if (foundClassTitle) {
    return res.status(200).json({ msg: 'Class title found successfully', foundClassTitle });
  }
});

router.get('/relatedactivity/:related_activity', (req, res) => {
  const relatedActivity = req.params.related_activity;
  const foundRelatedActivity = classes.filter((classe) => classe.related_activity.toLowerCase().indexOf(relatedActivity.toLowerCase()) > -1);

  if (foundRelatedActivity.length === 0) {
    return res.status(400).json({ msg: 'Class related activity not found, please try again' });
  }

  if (foundRelatedActivity) {
    return res.status(200).json({ msg: 'Class related activity found successfully', foundRelatedActivity });
  }
});

router.get('/assignedcoach/:assigned_coach', (req, res) => {
  const assignedCoach = req.params.assigned_coach;
  const foundAssignedCoach = classes.filter((classe) => classe.assigned_coach.toLowerCase().indexOf(assignedCoach.toLowerCase()) > -1);

  if (foundAssignedCoach.length === 0) {
    return res.status(400).json({ msg: 'Class assigned coach not found, please try again' });
  }

  if (foundAssignedCoach) {
    return res.status(200).json({ msg: 'Class assigned coach found successfully', foundAssignedCoach });
  }
});

module.exports = router;
