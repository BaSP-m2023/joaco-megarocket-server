import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import Member from '../models/Member';
import Classes from '../models/Class';
import subscriptionSeed from '../seeds/subscriptions';
import classSeed from '../seeds/classes';
import memberSeed from '../seeds/members';

const newSubscription = {
  _id: '6466aeb229ef0fba19e2cd85',
  classes: '6465816c08ae1e4d4b105a49',
  member: '646223b3731da1b875752bda',
};

const duplicatedId = {
  _id: '6466aeb229ef0fba19e2cd85',
  classes: '6465816c08ae1e4d4b105a49',
  member: '646223b3731da1b875752bda',
};

const dataBase = {
  classes: '64663d50bb2d87b9f6510625',
  member: '24625faf956fb774c56da140',
};

const dataSubscription = {
  classes: '74663d50bb2d87b9f6510624',
  member: '6462d0074441252c694332dd',
  date: new Date(),
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
    const response = await request(app).get('/api/subscriptions/65465461').send();
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
    const response = await request(app).post('/api/subscriptions').send(newSubscription);
    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
    expect(response.error).toBeTruthy();
    expect(response.body.message).toBe(response.body.message);
  });

  test('if ID is duplicated should return status 400', async () => {
    const response = await request(app).post('/api/subscriptions').send(duplicatedId);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if data is valid, return 201 and the created subscription info', async () => {
    const response = await request(app).post('/api/subscriptions').send(dataSubscription);
    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('if class or member are not found, return 404', async () => {
    const response = await request(app).post('/api/subscriptions').send(dataBase);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
