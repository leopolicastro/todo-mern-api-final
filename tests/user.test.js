const request = require('supertest');
const app = require('../server/app');
const User = require('../server/db/models/user');

const { userOne, userOneId, setUpDatabase } = require('./fixtures/db');

beforeEach(setUpDatabase);

test('Should signup a new user', async () => {
  const response = await request(app)
    .post('/api/users/')
    .send({
      name: 'Leo',
      email: 'leo@leo.com',
      password: 'remember'
    })
    .expect(201);
  // Assert that the database was changed correctly.
  const user = await User.findById(response.body._id);
  expect(user).not.toBeNull();
  // Assertions about the response
  expect(response.body.name).toBe('Leo');
  expect(response.body.email).toBe('leo@leo.com');
  expect(response.body.email).toBe('leo@leo.com');
  expect(user.password).not.toBe('remember');
});

test('Should login a user', async () => {
  const response = await request(app)
    .post('/api/users/login')
    .send({
      email: userOne.email,
      password: userOne.password
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(response.body.token).toBe(undefined);
});

test('Should not login a nonexistent user', async () => {
  await request(app)
    .post('/api/users/login')
    .send({
      email: userOne.email,
      password: 'wrongpassword'
    })
    .expect(400);
});

test('Should get profile for user', async () => {
  const response = await request(app)
    .get('/api/users/me')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  expect(response.body.name).toBe('Leo Test');
  expect(response.body.email).toBe('test@test.com');
});

test('Should not get profile for  unauthenticated user', async () => {
  await request(app).get('/users/me').send().expect(401);
});

test('Should delete account for user', async () => {
  const response = await request(app)
    .delete('/api/users/me')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .send()
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user).toBeNull();
});

test('Should not delete account for unathenticated user', async () => {
  await request(app).delete('/users/me').send().expect(401);
});

test('Should upload avatar image', async () => {
  await request(app)
    .post('/api/users/avatar')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .attach('avatar', 'tests/fixtures/wyncode-logo.png')
    .expect(200);
  const user = await User.findById(userOneId);
  expect(typeof user.avatar).toBe('string');
});

test('Should update valid user fields', async () => {
  await request(app)
    .patch('/api/users/me')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .send({
      name: 'Jess'
    })
    .expect(200);
  const user = await User.findById(userOneId);
  expect(user.name).toEqual('Jess');
});

test('Should not update invalid user fields', async () => {
  await request(app)
    .patch('/api/users/me')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .send({
      location: 'Philadelphia'
    })
    .expect(400);
});

test('Should log out a user', async () => {
  const response = await request(app)
    .post('/api/users/logout')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .expect(200);
  expect(response.body.message).toBe('Logged out');
});

test('Should log out all tokens', async () => {
  const response = await request(app)
    .post('/api/users/logoutAll')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .expect(200);
  expect(response.body.message).toBe('all devices logged out');
});

test('Should update user password', async () => {
  const response = await request(app)
    .put('/api/users/password')
    .set('Authorization', `jwt ${userOne.tokens[0].token}`)
    .send({
      password: 'Philadelphia'
    })
    .expect(200);
  expect(response.body.message).toBe('password updated successfully');
});
