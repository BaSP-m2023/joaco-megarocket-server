import request from 'supertest';
import app from '../app';
import SuperAdmin from '../models/Super-admin';
import superadminSeed from '../seeds/super-admin';

beforeAll(async () => {
  await SuperAdmin.collection.insertMany(superadminSeed);
});

describe('GET /api/Super-admin', () => {
  test('GET ALL super admins and return status 200', async () => {
    const response = await request(app).get('/api/super-admin').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('GET should return status 404', async () => {
    const response = await request(app).get('/api/invalid-route').send();
    expect(response.status).toBe(404);
  });

  test('GET if super admin data is empty, return 404', async () => {
    const response = await request(app).get('/api/super-admin').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(404);
      expect(response.body.data).toBe([]);
      expect(response.body.error).toBeTruthy();
    }
  });
});

describe('GET /api/Super-admin', () => {
  test('GET by Id super admins and return status 200', async () => {
    const response = await request(app).get('/api/super-admin/64619de9d65e6b69280df4c9').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('GET Invalid Mongoose ID status 400', async () => {
    const response = await request(app).get('/api/super-admin/646ssNOFUNCAs19de9d65e6b69280df4cs319').send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Get a non-existent ID status 404', async () => {
    const response = await request(app).get('/api/super-admin/64619de9d65e6b69280df4c1').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('POST /api/Super-admin', () => {
  test('POST should create a super admin with status 201', async () => {
    const mocksuperAdmin = {
      email: 'superadmin@superadmin.com',
      password: 'Test123!',
    };
    const response = await request(app).post('/api/super-admin').send(mocksuperAdmin);
    expect(response.status).toBe(201);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('POST Invalid post data should return status 400', async () => {
    const mocksuperAdmin = {
      email: 'supmin.com',
      password: 'rip123!',
    };
    const response = await request(app).post('/api/super-admin').send(mocksuperAdmin);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('POST The admin with this Email already exists status 400', async () => {
    const reqBody = {
      email: 'maradonaa@gmail.com',
    };
    const response = await request(app).post('/api/super-admin/').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('POST password RegEx status 400', async () => {
    const reqBody = {
      password: 'nofunca',
    };
    const response = await request(app).post('/api/super-admin/').send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('PUT /api/Super-admin', () => {
  test('PUT Invalid Mongoose ID status 400', async () => {
    const response = await request(app).put('/api/super-admin/6461ssNOFUNCAs9de9dss65e6b69280df4cs319');
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('PUT a non-existent ID status 404', async () => {
    const response = await request(app).put('/api/super-admin/64619de9d65e6b69280df4c1').send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('PUT if update success return 200', async () => {
    const reqBody = {
      email: 'superadministrador@superadmin.com',
      password: 'Test1234!',
    };
    const response = await request(app).put('/api/super-admin/64619de9d65e6b69280df4c9').send(reqBody);
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
});

describe('DELETE /api/Super-admin', () => {
  test('should delete one super admin status 200', async () => {
    const response = await request(app).delete('/api/super-admin/64619de9d65e6b69280df4c9');
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
  });

  test('DELETE Invalid Mongoose ID status 400', async () => {
    const response = await request(app).delete('/api/super-admin/64619de9d65e6b69210sdasdasdasddf4c9');
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('DELETE a non-existent ID status 404', async () => {
    const response = await request(app).delete('/api/super-admin/64619de9d65e6b69280df4c9');
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });
});
