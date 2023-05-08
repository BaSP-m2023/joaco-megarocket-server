const express = require('express');
const fs = require('fs');
const activities = require('../data/activity.json');

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
    res.send(foundActivity);
  } else {
    res.send('Activity not found');
  }
});

router.post('/post', (req, res) => {
  const newActivity = req.body;
  const activityRepeat = activities.find((activity) => activity.id === newActivity.id);
  if (activityRepeat) {
    res.send('Activity already exists');
  }
  activities.push(newActivity);
  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (error) => {
    if (error) {
      res.send('Activity can not be created');
    }
    res.send('Activity created');
  });
});

router.put('/:id', (req, res) => {
  const activityPut = req.params.id;
  const activityToUpdate = activities.find((activity) => activity.id === activityPut);
  const updatedActivity = req.body;
  const activityIndex = activities.indexOf(activityToUpdate);

  if (!activityToUpdate) {
    res.send('Activity not found');
  }
  activityToUpdate.Description = updatedActivity.Description || activityToUpdate.Description;

  activities[activityIndex] = activityToUpdate;

  fs.writeFile('src/data/activity.json', JSON.stringify(activities, null, 2), (error) => {
    if (error) {
      res.send('Error updating activity');
    } else {
      res.json({ msg: 'Activity updated successfully', activityToUpdate });
    }
  });
});

router.delete('/:id', (req, res) => {
  const activityDelete = req.params.id;
  const filterActivity = activities.filter((activity) => activity.id !== activityDelete);
  fs.writeFile('src/data/activity.json', JSON.stringify(filterActivity, null, 2), (error) => {
    if (error) {
      res.send('Activity can not be deleted');
    } else {
      res.send('Activity deleted');
    }
  });
});

module.exports = router;
