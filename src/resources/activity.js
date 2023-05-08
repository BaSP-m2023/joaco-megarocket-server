const express = require('express');
const fs = require('fs');
let activities = require('../data/activity.json');

const router = express.Router();

router.get('/get', (req, res) => {
  res.send(activities);
});

router.get('/getById/:id', (req, res) => {
  const activityid = req.params.id;
  const foundActivity = activities.filter(
    (activity) => activity.id === activityid,
  );
  if (foundActivity) {
    res.status(200).json(foundActivity);
  } else {
    res.status(404).json({ msg: 'Activity not found' });
  }
});

router.post('/post', (req, res) => {
  const newActivity = req.body;
  const activityRepeat = activities.find((activity) => activity.id === newActivity.id);
  if (activityRepeat) {
    res.status(400).json({ msg: 'Activity already exists' });
  }
  activities.push(newActivity);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (error) => {
    if (error) {
      res.status(400).json({ msg: 'Activity can not be created' });
    }
    res.status(201).json({ msg: 'Activity created', newActivity });
  });
});

router.put('/:id', (req, res) => {
  const activityPut = req.params.id;
  const activityToUpdate = activities.find((activity) => activity.id === activityPut);

  if (activityToUpdate) {
    const { description } = req.body;
    const updatedActivity = { ...activityToUpdate, description };
    activities = activities.map((activity) => {
      if (activity.id === activityPut) {
        return updatedActivity;
      }
      return activity;
    });

    fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (error) => {
      if (error) {
        res.status(400).json({ msg: 'Error updating activity' });
      } else {
        res.status(200).json({ msg: 'Activity updated successfully', updatedActivity });
      }
    });
  } else {
    res.status(404).json({ msg: 'Activity not found' });
  }
});

router.delete('/:id', (req, res) => {
  const activityDelete = req.params.id;
  const filterActivity = activities.filter((activity) => activity.id !== activityDelete);
  fs.writeFile('src/data/activity.json', JSON.stringify(filterActivity, null, 2), (error) => {
    if (error) {
      res.status(400).json({ msg: 'Activity can not be deleted' });
    } else {
      activities = filterActivity;
      res.status(200).json({ msg: 'Activity deleted' });
    }
  });
});

module.exports = router;
