const express = require('express');
const fs = require('fs');

const router = express.Router();
const subscriptions = require('../data/subscription.json');

router.use(express.urlencoded({ extended: false }));

// GET

router.get('/', (req, res) => {
  res.send(subscriptions);
});

router.get('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubscription = subscriptions.find(
    (subscription) => subscription.id.toString() === subscriptionId,
  );
  res.send(!foundSubscription ? 'Subscription does not exist yet' : foundSubscription);
});

module.exports = router;

// POST

router.post('/', (req, res) => {
  const newSubscription = req.body;
  subscriptions.push(newSubscription);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
    if (err) {
      res.send('Error! Subscription cannot be created');
    } else {
      res.send('Subscription created!');
    }
  });
});

// DELETE

router.delete('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const filteredSubscriptions = subscriptions.filter(
    (subscription) => subscription.id.toString() !== subscriptionId,
  );
  fs.writeFile('src/data/subscription.json', JSON.stringify(filteredSubscriptions, null, 2), (err) => {
    if (err) {
      res.send('Error! Subscription cannot be deleted');
    } else {
      res.send('Subscription deleted!');
    }
  });
});
