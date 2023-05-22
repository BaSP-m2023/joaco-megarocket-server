import request from 'supertest';
import app from '../app';
import Classes from '../models/Class';
import ClassesSeed from '../seeds/classes';

const insertData = async () => {
  await Classes.collection.insertMany(ClassesSeed);
};

describe('GET /api/classes', () => {
  test('if class data is empty, return 404', async () => {
    const response = await request(app).get('/api/classes').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(404);
      expect(response.body.data).toBe([]);
      expect(response.body.error).toBeTruthy();
    }
  });
  test('if class data is not empty, return 200 and the array', async () => {
    await insertData();
    const response = await request(app).get('/api/classes').send();
    expect(response.status).toBe(200);
    expect(response.body.data).not.toBe([]);
    expect(response.body.error).toBeFalsy();
  });
});

describe('GET /api/classes/:id', () => {
  test('if class ID is not valid, return 400', async () => {
    const id = 'hola123';
    const response = await request(app).get(`/api/classes/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.error).toBeTruthy();
  });
  test('if class ID is not found, return 404', async () => {
    const id = '6462359679333a385c67f704';
    const response = await request(app).get(`/api/classes/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.error).toBeTruthy();
  });
  test('if class ID is found, return 201', async () => {
    const id = '74663d50bb2d87b9f6510621';
    const response = await request(app).get(`/api/classes/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.error).toBeFalsy();
  });
});

describe('POST /api/classes', () => {
  test('if POST request has no data, return 400', async () => {
    const response = await request(app).post('/api/classes').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  describe('POST /api/classes', () => {
    test('if required fields are missing or data is incorrect, return 400 and an error message', async () => {
      const invalidClassData = {
        hour: '10:30',
        slots: '9',
        createdAt: new Date(),
        updatedAt: new Date(),
        __v: 0,
      };

      const response = await request(app).post('/api/classes').send(invalidClassData);
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
    });
  });

  test('if class already exists, return 400 and an error message', async () => {
    const classData = {
      _id: '6462359679333a385c67f703',
      day: 'Monday',
      hour: '13:30',
      slots: 7,
      createdAt: '2023-05-15T13:37:26.139Z',
      updatedAt: '2023-05-15T13:37:26.139Z',
      __v: 0,
    };

    await Classes.collection.insertOne(classData);

    const response = await request(app).post('/api/classes').send(classData);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  /* test('if POST request is valid, return 201 and the created class info', async () => {
    const classData = {
      day: 'Wednesday',
      hour: '10:30',
      trainer: '2462a2ee2aac39ef714f13d5',
      activity: '1462a2ee2aac39ef714f13d5',
      slots: 9,
    };

    const response = await request(app).post('/api/classes').send(classData);
    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  }); */
});

/* describe('PUT /api/classes', () => {
  test('Invalid ID should return status 400', async () => {
    const response = await request(app).put('api/classes/123456').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('ID not found should return status 400', async () => {
    const response = await request(app).put('api/classes/74663d50bb2d87b9f6510620').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
});
*/
