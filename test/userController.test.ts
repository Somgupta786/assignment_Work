import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import { expect } from 'chai';

const app = express();
describe('User Controller', () => {
  let testUserId: string;

  it('should create a new user', async () => {
    const userData = {
      email: 'test@example.com',
      name: 'Test User',
      age: 30,
      city: 'Test City',
      zipCode: '12345'
    };

    const response = await request(app)
      .post('/worko/user')
      .send(userData)
      .expect('Content-Type', /json/)
      .expect(201);

    testUserId = response.body._id; // Capture the created user ID
  });

  it('should update the user', async () => {
    const updatedUserData = {
      id: testUserId,
      email: 'updated@example.com',
      name: 'Updated User',
      age: 35,
      city: 'Updated City',
      zipCode: '54321'
    };

    const response = await request(app)
      .put(`/worko/user/${testUserId}`)
      .send(updatedUserData)
      .expect('Content-Type', /json/)
      .expect(200);

    expect(response.body.name).to.equal('Updated User');
  });

  // Add more tests for other CRUD operations
});
