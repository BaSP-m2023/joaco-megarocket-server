const express = require('express');

const router = express.Router();
const subscriptions = require('../data/subscription.json');

router.use(express.urlencoded({ extended: false }));

router.get('/', (req, res) => {
  res.send(subscriptions);
});

router.get('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubscription = subscriptions.find(
    (subscription) => subscription.id.toString() === subscriptionId,
  );
  res.send(foundSubscription);
});

module.exports = router;
