import request from 'supertest';
import app from '../app';
import activity from '../models/Activity';
import activitySeed from '../seeds/activities';

const activities = {
  name: 'voley',
  description: 'basic training that consists of throwing soft punches into the air with ertert erte reter dfgdfgdfeer er ert  ert',
  isActive: true,
};

const ActivityBad = {
  name: '',
  description: '',
  isActive: true,
};

const updatedActivity = {
  name: 'basquetball',
  description: 'fgsdfg sdfgiusnd fgnsdiolfng ldisfnil dsunjfgdsunj figsjudnf ikghbsdfkhg bsdfkhgb sdfhgbsdkjifhgb sdjfkhbgsdifh gbaildhf bgjidfag',
  isActive: false,
};

beforeAll(async () => {
  await activity.collection.insertMany(activitySeed);
});

describe('GET api/activities', () => {
  test('Should return status 200', async () => {
    const res = await request(app).get('/api/activities').send();
    expect(res.status).toBe(200);
    expect(res.error).toBeFalsy();
  });

  test('Should return status 404 if the endpoint no exist', async () => {
    const res = await request(app).get('/api/activitie').send();
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });

  test('should return a activity', async () => {
    const res = await request(app).get('/api/activities/6462261d7ead90b46b7471cc');
    expect(res.status).toBe(200);
    expect(res.body).toBe(res.body);
  });

  test('should not return a activity', async () => {
    const res = await request(app).get('/api/activities/6462261d7ead90b46b7471c5');
    expect(res.status).toBe(404);
    expect(res.error).toBeTruthy();
  });

  test('should return a error because is not id type mongoose', async () => {
    const res = await request(app).get('/api/activities/6462261d7ea');
    expect(res.status).toBe(400);
    expect(res.error).toBeTruthy();
  });
});

describe('POST /api/activities', () => {
  test('should create a activity', async () => {
    const res = await request(app).post('/api/activities').send(activities);
    expect(res.status).toBe(201);
    expect(res.body).toBe(res.body);
  });

  test('should return a error', async () => {
    const res = await request(app).post('/api/activities').send(ActivityBad);
    expect(res.status).toBe(400);
    expect(res.error).toBeTruthy();
  });
});

describe('PUT /api/activities/:id', () => {
  test('should update a activity', async () => {
    const res = await request(app).put('/api/activities/6466b3e7a21fd4069bcaf7c0').send(updatedActivity);
    expect(res.status).toBe(200);
    expect(res.body).toBe(res.body);
  });

  test('should return a error', async () => {
    const res = await request(app).put('/api/activities/6466b3e7a21fd4069bcaf7c0').send(ActivityBad);
    expect(res.status).toBe(400);
    expect(res.error).toBeTruthy();
  });

  test('should return a error, id not valid', async () => {
    const res = await request(app).put('/api/activities/6462261').send(updatedActivity);
    expect(res.status).toBe(400);
    expect(res.error).toBeTruthy();
  });
});

describe('DELETE /api/activities/:id', () => {
  test('should delete a activity', async () => {
    const res = await request(app).delete('/api/activities/6467cd965eada13a19071ab9');
    expect(res.status).toBe(200);
  });

  test('should return error, id not valid', async () => {
    const res = await request(app).delete('/api/activities/6467cd9');
    expect(res.status).toBe(400);
  });

  test('should return error, id not found', async () => {
    const res = await request(app).delete('/api/activities/6467cd965eada13a19071ab5');
    expect(res.status).toBe(404);
  });
});
