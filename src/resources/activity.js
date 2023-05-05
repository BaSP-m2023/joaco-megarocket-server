const express = require("express");
const activity = require("../data/activity.json");
const router = express.Router();

router.get("/get", (req, res) => {
  res.send(activity);
});

router.get('/getById/:id', (req, res) => {
  const activityid = req.params.id
  const foundActivity = activity.filter((activity) => activity.id === activityid)
  if (foundActivity) {
    res.send(foundActivity)
  } else {
    res.send('Activity not found')
  }
})

module.exports = router;
