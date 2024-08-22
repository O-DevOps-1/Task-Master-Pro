const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const User = require('../models/User');

chai.use(chaiHttp);
const expect = chai.expect;

describe('Auth Routes', () => {
  before(async () => {
    await User.deleteMany({});
  }) ;

  it('should register a new user', (done) => {
    chai.request(app)
      .post('/api/auth/register')
      .send({ name: 'John Doe', email: 'john@example.com', password: 'password' })
      .end((err, res) => {
        expect(res).to.have.status(201);
        expect(res.body).to.have.property('token');
        done();
      });
  });});
