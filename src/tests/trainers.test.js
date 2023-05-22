import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import trainerSeed from '../seeds/trainers';

const insertData = (async () => {
  await Trainer.collection.insertMany(trainerSeed);
});

describe('GET /api/trainers', () => {
  test('if trainers data is empty should return 404', async () => {
    const response = await request(app).get('/api/trainers').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toStrictEqual([]);
    expect(response.body.error).toBeTruthy();
  });

  test('if trainers data isnt empty should return 200 and its array', async () => {
    insertData();
    const response = await request(app).get('/api/trainers').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).not.toStrictEqual([]);
    expect(response.body.error).toBeFalsy();
  });
});

describe('GET /api/trainers/:id', () => {
  test('if insert invalid ID return 400', async () => {
    const id = '123';
    const response = await request(app).get(`/api/trainers/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if trainer ID isnt found return 404', async () => {
    const id = '646642acfac4c6a035b35001';
    const response = await request(app).get(`/api/trainers/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if trainer ID is found return 200', async () => {
    const id = '646642acfac4c6a035b35000';
    const response = await request(app).get(`/api/trainers/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
});

describe('PUT /api/trainers/:id', () => {
  test('if insert invalid ID return 400', async () => {
    const id = '123';
    const response = await request(app).put(`/api/trainers/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if trainer ID isnt found return 404', async () => {
    const id = '646642acfac4c6a035b35001';
    const response = await request(app).put(`/api/trainers/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if body is empty return 200 no changes', async () => {
    const id = '646642acfac4c6a035b35000';
    const reqBody = {};
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('if body matches with actual trainer return 200 no changes', async () => {
    const id = '6462a2ee2aac39ef714f13d5';
    const reqBody = {
      firstName: 'Delfi',
      isActive: true,
    };
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('if DNI exists return 400', async () => {
    const id = '6462a2ee2aac39ef714f13d5';
    const reqBody = {
      dni: 1234567,
    };
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if Email exists return 400', async () => {
    const id = '6462a2ee2aac39ef714f13d5';
    const reqBody = {
      email: 'gino@gmail.com',
    };
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if firstName has numbers return 400', async () => {
    const id = '6462a2ee2aac39ef714f13d5';
    const reqBody = {
      firstName: '123',
    };
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if DNI has letters return 400', async () => {
    const id = '6462a2ee2aac39ef714f13d5';
    const reqBody = {
      dni: 'asdfghj',
    };
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if update success return 200', async () => {
    const id = '6462a2ee2aac39ef714f13d5';
    const reqBody = {
      lastName: 'jojo',
    };
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
});
