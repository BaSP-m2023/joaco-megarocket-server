import request from 'supertest';
import app from '../app';
import activity from '../models/Activity';
import activitySeed from '../seeds/activities';

const activities = {
  name: 'voley',
  description: 'basic training that consists of throwing soft punches into the air with ertert erte reter dfd er ert  ert',
  isActive: true,
};

const activityBad = {
  name: '',
  description: '',
  isActive: true,
};

const updatedActivity = {
  name: 'basquetball',
  description: 'This is the most practiced sport nowadays by teams of men and women, both professionally and amateurishly.',
  isActive: false,
};

const activityRepeated = {
  name: 'functional',
  description: 'this activity involves movements that enable greater overall body functioning and improve performance through better coordination and muscle stimulation',
  isActive: false,
};

beforeAll(async () => {
  await activity.collection.insertMany(activitySeed);
});

describe('POST /api/activities', () => {
  test('should create a activity', async () => {
    const res = await request(app).post('/api/activities').send(activities);
    expect(res.status).toBe(201);
    expect(res.body).toBeDefined();
    expect(res.error).toBeFalsy();
  });

  test('should return a error, activity alredy exist', async () => {
    const res = await request(app).post('/api/activities').send(activityRepeated);
    expect(res.status).toBe(400);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });

  test('should return a error, create empty activity', async () => {
    const res = await request(app).post('/api/activities').send(activityBad);
    expect(res.status).toBe(400);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });

  test('Should return status 404 if the endpoint no exist', async () => {
    const res = await request(app).post('/api/activitie').send(activities);
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });
});

describe('PUT /api/activities/:id', () => {
  test('should update a activity', async () => {
    const res = await request(app).put('/api/activities/6466b3e7a21fd4069bcaf7c0').send(updatedActivity);
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.error).toBeFalsy();
  });

  test('should return a error, update a activity already exist', async () => {
    const res = await request(app).put('/api/activities/6467cd965eada13a19071ab9').send(activityRepeated);
    expect(res.status).toBe(200);
    expect(res.body.message).toBeDefined();
    expect(res.error).toBeFalsy();
  });

  test('should return a error', async () => {
    const res = await request(app).put('/api/activities/6466b3e7a21fd4069bcaf7c0').send(activityBad);
    expect(res.status).toBe(400);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });

  test('should return a error, id not valid', async () => {
    const res = await request(app).put('/api/activities/6462261').send(updatedActivity);
    expect(res.status).toBe(400);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });

  test('Should return status 404 if the endpoint no exist', async () => {
    const res = await request(app).put('/api/activitie').send(updatedActivity);
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });
});

describe('DELETE /api/activities/:id', () => {
  test('should delete a activity', async () => {
    const res = await request(app).delete('/api/activities/6467cd965eada13a19071ab9');
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.error).toBeFalsy();
  });

  test('should return error, id not valid', async () => {
    const res = await request(app).delete('/api/activities/6467cd9');
    expect(res.status).toBe(400);
    expect(res.error).toBeTruthy();
  });

  test('should return error, id not found', async () => {
    const res = await request(app).delete('/api/activities/6467cd965eada13a19071ab5');
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });

  test('Should return status 404 if the endpoint no exist', async () => {
    const res = await request(app).delete('/api/activitie').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });
});

describe('GET api/activities', () => {
  test('Should return status 200', async () => {
    const res = await request(app).get('/api/activities').send();
    expect(res.status).toBe(200);
    expect(res.body.data).toBeDefined();
    expect(res.error).toBeFalsy();
  });

  test('Should return status 404 if the endpoint no exist', async () => {
    const res = await request(app).get('/api/activitie').send();
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });

  test('should return a activity', async () => {
    const res = await request(app).get('/api/activities/6462261d7ead90b46b7471cc');
    expect(res.status).toBe(200);
    expect(res.body).toBeDefined();
    expect(res.error).toBeFalsy();
  });

  test('should not return a activity', async () => {
    const res = await request(app).get('/api/activities/6462261d7ead90b46b7471c5');
    expect(res.status).toBe(404);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });

  test('should return a error because is not id type mongoose', async () => {
    const res = await request(app).get('/api/activities/6462261d7ea');
    expect(res.status).toBe(400);
    expect(res.body.data).toBeUndefined();
    expect(res.error).toBeTruthy();
  });

  test('Should return status 404, there are no activities yet', async () => {
    await activity.deleteMany({});
    const res = await request(app).get('/api/activities').send();
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });
});
