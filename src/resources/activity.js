const express = require('express');
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
    res.send(foundActivity);
  } else {
    res.send('Activity not found');
  }
});

router.post('/post', (req, res) => {
  const newActivity = req.body;
  activities.push(newActivity);
  res.send('Activity created!');
});

router.put('/', (req, res) => {
  const activityPut = req.params.id;
  const editedActivity = activities.find(
    (activity) => activity.id === activityPut,
  );

  if (editedActivity) {
    const activityUpdated = req.body;
    activities = activities.map((activity) => {
      if (activity.id === activityPut) {
        return { ...activity, ...activityUpdated };
      }
      return activity;
    });

    res.send('Activity updated!');
  } else {
    res.send('Activity not found');
  }
});

router.delete('/:id', (req, res) => {
  const activityDelete = req.params.id;
  const deletedActivity = activities.find(
    (activity) => activity.id === activityDelete,
  );

  if (deletedActivity) {
    activities = activities.filter((activity) => activity.id !== activityDelete);
    res.send('Activity deleted!');
  } else {
    res.send('Activity not found');
  }
});

module.exports = router;
