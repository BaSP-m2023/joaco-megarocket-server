import request from 'supertest';
import app from '../app';
import activity from '../models/Activity';
import activitySeed from '../seeds/activities';

beforeAll(async () => {
  await activity.collection.insertMany(activitySeed);
});

describe('GET api/activities', () => {
  test('Should return status 200', async () => {
    const response = await request(app).get('/api/activities').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  test('Should return status 404 if the endpoint no exist', async () => {
    const response = await request(app).get('/api/activitie').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });

  test("should return a activity", async () => {
    const res = await request(app).get('/api/activities/6462261d7ead90b46b7471cc');
    expect(res.status).toBe(200);
  });
});
