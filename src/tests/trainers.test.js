import request from 'supertest';
import app from '../app';
import Trainer from '../models/Trainer';
import trainerSeed from '../seeds/trainers';

const newTrainer = {
  firstName: 'Pepito',
  lastName: 'jeje',
  dni: 42180329,
  phone: 3416656867,
  email: 'email@hotmail.com',
  city: 'Rosario',
  password: 'Holis123aa',
  salary: 50000,
  isActive: true,
};

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

  test('if body is empty return 400 no changes', async () => {
    const id = '646642acfac4c6a035b35000';
    const reqBody = {};
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if body matches with actual trainer return 400 no changes', async () => {
    const id = '6462a2ee2aac39ef714f13d5';
    const reqBody = {
      firstName: 'Delfi',
      isActive: true,
    };
    const response = await request(app).put(`/api/trainers/${id}`).send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
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

describe('POST /api/trainers', () => {
  test('Should create a trainer', async () => {
    const response = await request(app).post('/api/trainers').send(newTrainer);
    expect(response.status).toBe(201);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('Should return The admin with DNI already exists', async () => {
    const reqBody = {
      dni: 43576575,
    };
    const response = await request(app).post('/api/trainers').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Should return The admin with this Email already exists', async () => {
    const reqBody = {
      email: 'delfi@gmail.com',
    };
    const response = await request(app).post('/api/trainers').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Should return invalid name format', async () => {
    const reqBody = {
      firstName: '123Gino',
    };
    const response = await request(app).post('/api/admins').send(reqBody);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Should return invalid phone number fortmat', async () => {
    const reqBody = {
      phone: '8383',
    };
    const response = await request(app).post('/api/admins').send(reqBody);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Should return invalid Password format', async () => {
    const reqBody = {
      password: 'strongepassword123',
    };
    const response = await request(app).post('/api/admins').send(reqBody);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Should return invalid salary format', async () => {
    const reqBody = {
      salary: 'salary',
    };
    const response = await request(app).post('/api/admins').send(reqBody);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });

  test('Should return an status 400', async () => {
    const reqBody = {};
    const response = await request(app).post('/api/trainers').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /api/trainers', () => {
  test('Should delete a trainer with a status 200', async () => {
    const id = '646642acfac4c6a035b35000';
    const response = await request(app).delete(`/api/trainers/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('Should return ID not found with a status 404 (previously deleted)', async () => {
    const id = '646642acfac4c6a035b35000';
    const response = await request(app).delete(`/api/trainers/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Should return ID not found with a status 404', async () => {
    const id = '646642acfac4c6a035b35002';
    const response = await request(app).delete(`/api/trainers/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Should return ID is not valid with a status 400', async () => {
    const id = '646';
    const response = await request(app).delete(`/api/trainers/${id}`);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });
});
