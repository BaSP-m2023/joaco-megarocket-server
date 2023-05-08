const express = require('express');
const fs = require('fs');

const router = express.Router();
const subscriptions = require('../data/subscription.json');

router.use(express.urlencoded({ extended: false }));

// GET All subscriptions

router.get('/', (req, res) => {
  res.send(subscriptions);
});

// GET Single Subscription by filter

router.get('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const foundSubscription = subscriptions.filter(
    (subscription) => subscription.id.toString() === subscriptionId,
  );
  res.send(!foundSubscription ? 'Subscription does not exist yet' : foundSubscription);
});

module.exports = router;

// POST

router.post('/', (req, res) => {
  let newSubscription = req.body;
  const lastId = subscriptions[subscriptions.length - 1].id;
  if (Object.entries(newSubscription).length === 0) {
    res.status(400).json({ msg: 'empty field' });
  }
  newSubscription = { id: lastId + 1, ...newSubscription };
  subscriptions.push(newSubscription);
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
    if (err) throw err;
    res.status(200).json({ msg: 'Subscription created', newSubscription });
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

// PUT

router.put('/:id', (req, res) => {
  const subscriptionId = req.params.id;
  const found = subscriptions.find(
    (subscription) => subscription.id.toString() === subscriptionId,
  );
  const indexFound = subscriptions.indexOf(found);
  const updSubscription = req.body;
  if (!found) {
    res.status(400).json({ msg: `Subscription ${subscriptionId} does not exist` });
  }
  if (Object.entries(updSubscription).length === 0) {
    res.status(400).json({ msg: 'empty field' });
  }
  found.class = updSubscription.class ? updSubscription.class : found.class;
  found.date = updSubscription.date ? updSubscription.date : found.date;
  found.hour = updSubscription.hour ? updSubscription.hour : found.hour;
  subscriptions[indexFound] = found;
  fs.writeFile('src/data/subscription.json', JSON.stringify(subscriptions, null, 2), (err) => {
    if (err) throw err;
    res.status(200).json({ msg: `Subscription ${subscriptionId} modified`, found });
  });
});
