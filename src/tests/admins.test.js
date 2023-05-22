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
  test('should return email already exists with status 400', async () => {
    const mockID = '74663d50bb2d87b9f6510627';
    const updatedAdmin = {
      email: 'fed58@gmail.com',
    };
    const response = await request(app).put(`/api/admins/${mockID}`).send(updatedAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
  });
  test('should return dni already exists with status 400', async () => {
    const mockID = '74663d50bb2d87b9f6510627';
    const updatedAdmin = {
      dni: 98765412,
    };
    const response = await request(app).put(`/api/admins/${mockID}`).send(updatedAdmin);
    expect(response.body.data).toBeUndefined();
    expect(response.status).toBe(400);
    expect(response.error).toBeTruthy();
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
