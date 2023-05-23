import request from 'supertest';
import app from '../app';
import Subscription from '../models/Subscription';
import Member from '../models/Member';
import Classes from '../models/Class';
import subscriptionSeed from '../seeds/subscriptions';
import classSeed from '../seeds/classes';
import memberSeed from '../seeds/members';

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

// describe('POST /api/subscriptions',() => {
//   test('should create a new subscription with status 201', async  () => {
//     const response = await request(app).post('/api/subscriptions').send(mock)
//   })
// })

test('should pass a basic test', () => {
  expect(1 + 1).toBe(2);
});
