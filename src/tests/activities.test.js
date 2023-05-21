import request from 'supertest';
import app from '../app';
import activity from '../models/Activity';
import activitySeed from '../seeds/activities';

beforeAll(async () => {
  await activity.collection.insertMany(activitySeed);
}, 60000);

describe('GET api/activities', () => {
  test('Should return all activites with status 200', async () => {
    const response = await request(app).get('/activities').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });

  // test('Should return status 404', async () => {
  //   const response = await request(app).get('/activities').send();
  //   expect(response.status).toBe(404);
  //   expect(response.error).toBeTruthy();
  // });

  // test('Should return status 404 if the endpoint no exist', async () => {
  //   const response = await request(app).get('/activitie').send();
  //   expect(response.status).toBe(404);
  //   expect(response.error).toBeTruthy();
  // });
});
