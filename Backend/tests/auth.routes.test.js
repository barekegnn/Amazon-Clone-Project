import { afterEach, describe, it, mock } from 'node:test';
import assert from 'node:assert/strict';
import request from 'supertest';

process.env.NODE_ENV = 'test';

const loadApp = async () => {
  const { default: app } = await import('../src/app.js');
  return app;
};

const stubAuthService = async (overrides = {}) => {
  const module = await import('../src/services/auth.service.js');
  const authService = module.default;

  const defaultStubs = {
    registerUser: async () => ({ success: true, user: {} }),
    loginUser: async () => ({ success: true, user: {} }),
    logoutUser: async () => ({ success: true, message: 'User signed out successfully' }),
    resetPassword: async () => ({ success: true, message: 'Password reset email sent' })
  };

  const implementations = { ...defaultStubs, ...overrides };

  Object.entries(implementations).forEach(([method, implementation]) => {
    if (authService && typeof authService[method] === 'function') {
      mock.method(authService, method, implementation);
    }
  });
};

describe('Auth routes', () => {
  afterEach(() => {
    mock.restoreAll();
  });

  it('rejects invalid registration payloads', async () => {
    await stubAuthService();
    const app = await loadApp();

    const response = await request(app)
      .post('/api/auth/register')
      .send({})
      .expect(400);

    assert.equal(response.body.success, false);
    assert.equal(response.body.message, 'Validation failed');
    assert.ok(Array.isArray(response.body.errors.email));
  });

  it('registers a user when service succeeds', async () => {
    await stubAuthService({
      registerUser: async () => ({
        success: true,
        user: {
          uid: 'uid-123',
          email: 'user@example.com',
          displayName: 'Test User'
        }
      })
    });

    const app = await loadApp();

    const payload = {
      email: 'user@example.com',
      password: 'password123',
      displayName: 'Test User'
    };

    const response = await request(app)
      .post('/api/auth/register')
      .send(payload)
      .expect(201);

    assert.equal(response.body.success, true);
    assert.equal(response.body.message, 'Registration successful');
    assert.equal(response.body.data.user.email, payload.email);
  });

  it('maps Firebase auth errors on login', async () => {
    await stubAuthService({
      loginUser: async () => ({
        success: false,
        code: 'auth/wrong-password',
        error: 'Wrong password'
      })
    });

    const app = await loadApp();

    const response = await request(app)
      .post('/api/auth/login')
      .send({ email: 'user@example.com', password: 'incorrect' })
      .expect(401);

    assert.equal(response.body.success, false);
    assert.equal(response.body.message, 'Incorrect password.');
  });

  it('blocks logout when user is unauthenticated', async () => {
    const app = await loadApp();

    const response = await request(app)
      .post('/api/auth/logout')
      .expect(401);

    assert.equal(response.body.success, false);
    assert.equal(response.body.message, 'Authentication required to access this resource.');
  });
});
