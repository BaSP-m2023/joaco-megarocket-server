/* eslint-disable no-const-assign */
/* eslint-disable radix */
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

router.put('/activities/:id', (req, res) => {
  const activityid = parseInt(req.params.id);
  const foundActivity = activities.find(
    (activity) => activity.id === activityid,
  );

  if (foundActivity) {
    const activityUpdated = req.body;
    activities = activities.map((activity) => {
      if (activity.id === activityid) {
        return { ...activity, ...activityUpdated };
      }
      return activity;
    });

    res.send('Activity updated!');
  } else {
    res.send('Activity not found');
  }
});

router.delete('/activities/:id', (req, res) => {
  const activityid = parseInt(req.params.id);
  const foundActivity = activities.find(
    (activity) => activity.id === activityid,
  );

  if (foundActivity) {
    activities = activities.filter((activity) => activity.id !== activityid);
    res.send('Activity deleted!');
  } else {
    res.send('Activity not found');
  }
});

module.exports = router;
