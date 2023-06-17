import request from 'supertest';
import app from '../app';
import Classes from '../models/Class';
import Trainers from '../models/Trainer';
import Activity from '../models/Activity';
import ClassesSeed from '../seeds/classes';
import TrainersSeed from '../seeds/trainers';
import ActivitySeed from '../seeds/activities';

beforeAll(async () => {
  await Classes.collection.insertMany(ClassesSeed);
  await Trainers.collection.insertMany(TrainersSeed);
  await Activity.collection.insertMany(ActivitySeed);
});

describe('GET /api/classes', () => {
  test('if class data is empty, return 404', async () => {
    const response = await request(app).get('/api/classes').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(404);
      expect(response.body.data).toBe([]);
      expect(response.body.error).toBeTruthy();
    }
  });

  test('If the endpoint is wrong, return 400', async () => {
    const response = await request(app).get('/api/classessss').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
    }
  });

  test('if class data is not empty, return 200 and the array', async () => {
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
    const id = '64625faf956fb774c56da140';
    const response = await request(app).get(`/api/classes/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.error).toBeTruthy();
  });

  test('If the endpoint is wrong, return 400', async () => {
    const id = '74663d50bb2d87b9f6510621';
    const response = await request(app).get(`/api/classessss/${id}`).send();
    if (response.body.data === 0) {
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
    }
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
  test('If trainer or activity IDs are not valid, return 400 and an error message', async () => {
    const classData = {
      day: 'Wednesday',
      hour: '10:30',
      trainer: '***646642acfac4c6a035b35000',
      activity: '***6462261d7ead90b46b7471cc',
      slots: 9,
    };

    const response = await request(app).post('/api/classes').send(classData);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Duplicated class should return status 400', async () => {
    const duplicatedClass = {
      day: 'Sunday', hour: '20:00',
    };
    const response = await request(app).post('/api/classes').send(duplicatedClass);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If trainer or activity IDs are not found, return 404 and an error message', async () => {
    const classData = {
      day: 'Wednesday',
      hour: '10:00',
      trainer: '746642acfac4c6a035b35000',
      activity: '7462261d7ead90b46b7471cc',
      slots: 9,
    };
    const response = await request(app).post('/api/classes').send(classData);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if POST request has no data, return 400', async () => {
    const response = await request(app).post('/api/classes').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  describe('POST /api/classes', () => {
    test('if required fields are missing or data is incorrect, return 400 and an error message', async () => {
      const invalidClassData = {
        hour: '10:00',
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
      hour: '13:00',
      slots: 7,
      createdAt: '2023-05-15T13:37:26.139Z',
      updatedAt: '2023-05-15T13:37:26.139Z',
      __v: 0,
    };

    const response = await request(app).post('/api/classes').send(classData);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If the endpoint is wrong, return 400', async () => {
    const response = await request(app).post('/api/classessss').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
    }
  });

  test('if POST request is valid, return 201 and the created class info', async () => {
    const classData = {
      day: 'Wednesday',
      hour: '10:00',
      trainer: '646642acfac4c6a035b35000',
      activity: '6462261d7ead90b46b7471cc',
      slots: 9,
    };

    const response = await request(app).post('/api/classes').send(classData);
    expect(response.status).toBe(201);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
});

describe('PUT /api/classes', () => {
  test('If trainer or activity IDs are not valid, return 400 and an error message', async () => {
    const classData = {
      day: 'Wednesday',
      hour: '10:30',
      trainer: '***646642acfac4c6a035b35000',
      activity: '***6462261d7ead90b46b7471cc',
      slots: 9,
    };

    const response = await request(app).put('/api/classes/74663d50bb2d87b9f6510624').send(classData);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If trainer or activity IDs are not found, return 404 and an error message', async () => {
    const classData = {
      day: 'Wednesday',
      hour: '10:00',
      trainer: '746642acfac4c6a035b35000',
      activity: '7462261d7ead90b46b7471cc',
      slots: 9,
    };
    const response = await request(app).put('/api/classes/74663d50bb2d87b9f6510624').send(classData);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Invalid ID should return status 400', async () => {
    const response = await request(app).put('/api/classes/123456').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('ID not found should return status 404', async () => {
    const updatedClass = {
      day: 'Monday', hour: '20:00',
    };
    const response = await request(app).put('/api/classes/74663d50bb2d87b9f6510629').send(updatedClass);
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Duplicated class should return status 400', async () => {
    const duplicatedClass = {
      day: 'Sunday', hour: '20:00',
    };
    const response = await request(app).put('/api/classes/74663d50bb2d87b9f6510620').send(duplicatedClass);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Day not valid should return status 400', async () => {
    const dayInvalid = {
      day: 'Miernes',
    };
    const response = await request(app).put('/api/classes/74663d50bb2d87b9f6510620').send(dayInvalid);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Hour not valid should return status 400', async () => {
    const hourInvalid = {
      hour: 'asd023',
    };
    const response = await request(app).put('/api/classes/74663d50bb2d87b9f6510620').send(hourInvalid);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If no changes were made, return status 400', async () => {
    const notChanged = { day: 'Thursday' };
    const response = await request(app).put('/api/classes/74663d50bb2d87b9f6510624').send(notChanged);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If the endpoint is wrong, return 400', async () => {
    const response = await request(app).put('/api/classessss').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
    }
  });

  test('Updated class should return status 200', async () => {
    const validClass = {
      day: 'Monday',
      hour: '10:00',
      slots: 15,
    };
    const response = await request(app).put('/api/classes/74663d50bb2d87b9f6510621').send(validClass);
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });
});

describe('DELETE /api/classes', () => {
  test('Invalid ID should return status 400', async () => {
    const response = await request(app).delete('/api/classes/123456').send();
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('ID not found should return status 404', async () => {
    const response = await request(app).delete('/api/classes/74663d50bb2d87b9f6510620').send();
    expect(response.status).toBe(404);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If the endpoint is wrong, return 400', async () => {
    const response = await request(app).delete('/api/classessss').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
    }
  });

  test('Delete class should return status 200 and delete it', async () => {
    const response = await request(app).delete('/api/classes/74663d50bb2d87b9f6510621').send();
    expect(response.status).toBe(200);
    expect(response.body.error).toBeFalsy();
  });

  test('Double deleted class should return not found', async () => {
    const response = await request(app).delete('/api/classes/74663d50bb2d87b9f6510621').send();
    expect(response.status).toBe(404);
    expect(response.body.error).toBeTruthy();
  });
});
