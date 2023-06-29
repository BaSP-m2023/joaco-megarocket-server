import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app';
import Subscription from '../models/Subscription';
import Member from '../models/Member';
import Classes from '../models/Class';
import subscriptionSeed from '../seeds/subscriptions';
import classSeed from '../seeds/classes';
import memberSeed from '../seeds/members';

const dataClassInvalid = {
  classes: '64663d50bb2d87b9f6510625',
  member: '24625faf956fb774c56da140',
  date: '2023-06-24T17:00:00.700+00:00',
};

const noValidData = {
  classes: '---64663d50bb2d87b9f6510625',
  member: '--24625faf956fb774c56da140',
};
const idDuplicated = {
  _id: new mongoose.Types.ObjectId('6466aeb229ef0fba19e2cd82'),
  classes: '6465816c08ae1e4d4b105a49',
  member: '646223b3731da1b875752bda',
  date: '2023-05-13T21:07:44.700+00:00',
};

const invalidSupscrition = {
  _id: '6462439ab744865babed70',
  classes: '6465816c08ae1e4d4b105a49',
  member: '646223b3731da1b875752bda',
  date: '2023-05-13T21:07:44.700+00:00',
};

beforeAll(async () => {
  await Subscription.collection.insertMany(subscriptionSeed);
  await Classes.collection.insertMany(classSeed);
  await Member.collection.insertMany(memberSeed);
});

describe('GET /api/subscriptions', () => {
  test('if data isnt empty should return 200 and its array', async () => {
    const response = await request(app).get('/api/subscriptions').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('GET /api/subscriptions', () => {
  test('if id is different from mongoose type should return 400', async () => {
    const response = await request(app).get('/api/subscriptions/:id').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('if id do not exist should return 404', async () => {
    const response = await request(app).get('/api/subscriptions/6466aeb229ef0fba19e2cd81').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('if exist should return 200', async () => {
    const response = await request(app).get('/api/subscriptions/6466aeb229ef0fba19e2cd82').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('DELETE /api/subscriptions', () => {
  test('if id is correct should return 200', async () => {
    const response = await request(app).delete('/api/subscriptions/6466f6c43b2af1a6510deea5').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('if id is different from mongoose type should return 400', async () => {
    const response = await request(app).delete('/api/subscriptions/65465461').send();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('if id do not exist should return 404', async () => {
    const response = await request(app).get('/api/subscriptions/6466aeb229ef0fba19e2cd81').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('POST /api/subscriptions', () => {
  test('if subscription id is not valid should return 400', async () => {
    const response = await request(app).post('/api/subscriptions').send(invalidSupscrition);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBe(response.body.message);
  });

  test('if ID is duplicated should return status 400', async () => {
    const response = await request(app).post('/api/subscriptions').send(idDuplicated);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  // test('if data is valid, return 201 and the created subscription info', async () => {
  //   const response = await request(app).post('/api/subscriptions').send(validSupscrition);
  //   expect(response.status).toBe(201);
  //   expect(response.body.data).toBeDefined();
  //   expect(response.body.error).toBeFalsy();
  // });

  // test('if class or member are not found, return 404', async () => {
  //   const response = await request(app).post('/api/subscriptions').send(dataClassInvalid);

  //   expect(response.status).toBe(400);
  //   expect(response.body.data).toBeUndefined();
  //   expect(response.body.error).toBeTruthy();
  // });
});

describe('PUT /api/subscriptions', () => {
  test('if member or class ids are not valid, return 400', async () => {
    const response = await request(app).put('/api/subscriptions/64663d50bb2d87b9f6510628').send(noValidData);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if member or class ids are not found, return 404', async () => {
    const response = await request(app).put('/api/subscriptions/6466f6c43b2af1a6510deea5').send(dataClassInvalid);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if the id is invalid should return status 400', async () => {
    const response = await request(app).put('/api/subscriptions/9897981987951987498').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('updated subscription should return status 200', async () => {
    const response = await request(app).put('/api/subscriptions/6466aeb229ef0fba19e2cd82').send({ date: new Date() });
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('id not found should return status 404', async () => {
    const response = await request(app).put('/api/subscriptions/52663d50bb2d87b9f6510629').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
