/* eslint-disable no-underscore-dangle */
import request from 'supertest';
import app from '../app';
import Admin from '../models/Admin';
import adminSeed from '../seeds/admins';

beforeAll(async () => {
  await Admin.collection.insertMany(adminSeed);
});

describe('GET /api/admins', () => {
  test('should return status 200 and error false', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return status 404 and error true', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('data lenght should be equal to admin seed length', async () => {
    const response = await request(app).get('/api/admins').send();
    expect(response.body.data.length).toEqual(adminSeed.length);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
});

describe('GET /api/admins/:id', () => {
  test('should return admin data with status 200', async () => {
    const mockID = '74663d50bb2d87b9f6510627';
    const mockEmail = 'rob@gmail.es';
    const response = await request(app).get(`/api/admins/${mockID}`).send();
    expect(response.body.data.email).toEqual(mockEmail);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return admin not found with status 404', async () => {
    const mockID = '74663d50bb2d87b9f6510611';
    const response = await request(app).get(`/api/admins/${mockID}`).send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return invalid id format with status 400', async () => {
    const mockID = '111';
    const response = await request(app).get(`/api/admins/${mockID}`).send();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Id is not a valid one');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 404 and error true', async () => {
    const response = await request(app).get('/api/admin').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});

describe('PUT /api/admins/:id', () => {
  test('should return admin updated with status 200', async () => {
    const mockID = '74663d50bb2d87b9f6510627';
    const updatedAdmin = {
      firstName: 'Julian',
    };
    const response = await request(app).put(`/api/admins/${mockID}`).send(updatedAdmin);
    expect(response.body.data.firstName).toEqual(updatedAdmin.firstName);
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return no changes with status 200', async () => {
    const mockID = '74663d50bb2d87b9f6510627';
    const updatedAdmin = {
      lastName: 'Admin',
      dni: 98765413,
    };
    const response = await request(app).put(`/api/admins/${mockID}`).send(updatedAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return no changes with data undefined and status 200', async () => {
    const mockID = '74663d50bb2d87b9f6510627';
    const response = await request(app).put(`/api/admins/${mockID}`).send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return admin not found with status 404', async () => {
    const mockID = '74663d50bb2d87b9f6510611';
    const response = await request(app).put(`/api/admins/${mockID}`).send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return invalid id format with status 400', async () => {
    const mockID = '111';
    const response = await request(app).put(`/api/admins/${mockID}`).send();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Id is not a valid one');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 404 and error true', async () => {
    const response = await request(app).put('/api/admin').send();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
const newAdmin = {
  firstName: 'Barbara',
  lastName: 'Administer',
  dni: 56231478,
  phone: 3415576635,
  email: 'admin@gmail.es',
  city: 'Rosario',
  password: 'holacomo1234',
};
const newBadAdmin = {
  firstName: 'B',
  lastName: 'Adminn',
  dni: 42182913,
  phone: 3415576635,
  email: 'admins@gmail.es',
  city: 'Rosario',
  password: 'holacomo1234',
};
describe('POST /api/admins', () => {
  test('should return admin created with status 201', async () => {
    const response = await request(app).post('/api/admins').send(newAdmin);
    expect(response.body.data).toBeDefined();
    expect(response.status).toBe(201);
    expect(response.error).toBeFalsy();
  });
  test('should return admin dni already exists with status 400', async () => {
    const response = await request(app).post('/api/admins').send(newAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('An admin with DNI or Email already exists');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return admin email already exists with status 400', async () => {
    newAdmin.dni = 96523748;
    const response = await request(app).post('/api/admins').send(newAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('An admin with DNI or Email already exists');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return admin incorrect name with status 400', async () => {
    const response = await request(app).post('/api/admins').send(newBadAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return admin incorrect city with status 400', async () => {
    newBadAdmin.firstName = 'Julian';
    newBadAdmin.city = '123456';
    const response = await request(app).post('/api/admins').send(newBadAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return admin can not be empty  with status 400', async () => {
    const response = await request(app).post('/api/admins').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return admin incorrect phone with status 400', async () => {
    newBadAdmin.phone = '125365478';
    const response = await request(app).post('/api/admins').send(newBadAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 404 and error true', async () => {
    const response = await request(app).post('/api/admin').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
describe('DELETE /api/admins/:id', () => {
  test('should return admin delete with status 200', async () => {
    const mockID = '74663d50bb2d87b9f6510627';
    const response = await request(app).delete(`/api/admins/${mockID}`).send();
    expect(response.body.data).toBeDefined();
    expect(response.body.message).toEqual('Admin successfully deleted!');
    expect(response.status).toBe(200);
    expect(response.error).toBeFalsy();
  });
  test('should return admin not found with status 404', async () => {
    const mockID = '74663d50bb2d87b9f6510627';
    const response = await request(app).delete(`/api/admins/${mockID}`).send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
  test('should return invalid id format with status 400', async () => {
    const mockID = '111';
    const response = await request(app).delete(`/api/admins/${mockID}`).send();
    expect(response.body.data).toBeUndefined();
    expect(response.body.message).toEqual('Id is not a valid one');
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return status 404 and error true', async () => {
    const response = await request(app).delete('/api/admin').send();
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(404);
    expect(response.error).toBeTruthy();
  });
});
