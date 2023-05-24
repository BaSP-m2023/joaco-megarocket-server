import request from 'supertest';
import app from '../app';
import Member from '../models/Member';
import memberSeed from '../seeds/members';

const insertData = (async () => {
  await Member.collection.insertMany(memberSeed);
});
describe('GET /api/members', () => {
  test('if members data is empty, return 404', async () => {
    const response = await request(app).get('/api/members').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(404);
      expect(response.body.data).toBe([]);
      expect(response.body.error).toBeTruthy();
    }
  });

  test('if members data isnt empty should return 200 and its array', async () => {
    insertData();
    const response = await request(app).get('/api/members').send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).not.toStrictEqual([]);
    expect(response.body.error).toBeFalsy();
  });

  test('If route api is incorrect return 400', async () => {
    const response = await request(app).get('/api/membersssssss').send();
    if (response.body.data === 0) {
      expect(response.status).toBe(400);
      expect(response.body.data).toBeUndefined();
      expect(response.body.error).toBeTruthy();
    }
  });
});

describe('GET /api/members/:id', () => {
  test('if insert invalid ID return 400', async () => {
    const id = '2qwre3';
    const response = await request(app).get(`/api/members/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if member ID isnt found return 404', async () => {
    const id = '6462d0074441252c694332d8';
    const response = await request(app).get(`/api/members/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('if member ID is found return 200', async () => {
    const id = '6462d0074441252c694332dd';
    const response = await request(app).get(`/api/members/${id}`).send();
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
});

describe('PUT /api/members/:id', () => {
  test('If the ID is not valid return 400', async () => {
    const id = '8514';
    const response = await request(app).get(`/api/members/${id}`).send();
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If the ID is not found return 404', async () => {
    const id = '6462d0074441252c694312dd';
    const response = await request(app).get(`/api/members/${id}`).send();
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If dni has letters return 400', async () => {
    const id = '64625f36956fb774c56da13e';
    const reqBody = {
      dni: 'eooo',
    };
    const response = await request(app).put(`/api/members/${id}`).send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If update success return 201', async () => {
    const id = '64625f36956fb774c56da13e';
    const reqBody = {
      firstName: 'Jorge',
      lastName: 'Ruiz',
      city: 'Rosario',
    };
    const response = await request(app).put(`/api/members/${id}`).send(reqBody);
    expect(response.status).toBe(201);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('If ID is trying to be updated return 400', async () => {
    const id = '64625f36956fb774c56da13e';
    const reqBody = {
      _id: 'asdqawawdadw',
    };
    const response = await request(app).put(`/api/members/${id}`).send(reqBody);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If there were no changes return 200', async () => {
    const id = '6462d0074441252c694332dd';
    const changes = { firstName: 'Elon' };
    const response = await request(app).put(`/api/members/${id}`).send(changes);
    expect(response.status).toBe(200);
    expect(response.body.data).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });
});

describe('POST /api/members', () => {
  test('If email is not valid return 400', async () => {
    const newMember = {
      firstName: 'Elon',
      lastName: 'Musk',
      dni: 42180329,
      phone: 1234567891,
      email: 'aaaa',
      city: 'Gotham',
      birthday: '20/10/2020',
      postalCode: 2132,
      isActive: true,
      membership: 'Classic Membership',
    };

    const response = await request(app).post('/api/members').send(newMember);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });

  test('Returns the member with the same phone', async () => {
    const memberPhone = {
      phone: 1234567891,
    };
    const response = await request(app).post('/api/members').send(memberPhone);
    expect(response.status).toBe(400);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });
});

describe('DELETE /api/members', () => {
  test('Should delete a member', async () => {
    const id = '6462d0074441252c694332dd';
    const response = await request(app).delete(`/api/members/${id}`);
    expect(response.status).toBe(200);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeFalsy();
  });

  test('Should return 404 if the member was deleted', async () => {
    const id = '6462d0074441252c694332dd';
    const response = await request(app).delete(`/api/members/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });

  test('If ID is not valid return 400', async () => {
    const id = '24124';
    const response = await request(app).delete(`/api/members/${id}`);
    expect(response.status).toBe(400);
    expect(response.body.data).toBeUndefined();
    expect(response.body.error).toBeTruthy();
  });
  test('If ID is not found return 404', async () => {
    const id = '6462d0074441252c694332fd';
    const response = await request(app).delete(`/api/members/${id}`);
    expect(response.status).toBe(404);
    expect(response.body.message).toBeDefined();
    expect(response.body.error).toBeTruthy();
  });
});
