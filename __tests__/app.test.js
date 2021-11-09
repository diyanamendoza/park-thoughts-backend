const pool = require('../lib/utils/pool.js');
const setup = require('../data/setup.js');
const request = require('supertest');
const app = require('../lib/app.js');
// const WipService = require('../lib/services/WipService.js');
// const { sendWipEmail } = require('../lib/utils/sendWipEmail.js');

const mockSES = {
  SES: jest.fn().mockReturnThis(),
  sendEmail: jest.fn().mockReturnThis(),
  promise: jest.fn().mockReturnThis(),
  then: jest.fn().mockReturnThis()
}

jest.mock('aws-sdk', () => {
  return { SES: jest.fn(() => mockSES) }
})

describe('lab routes', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });


  //makeProfile + POST - new user
  it('makes a profile via POST and returns that profile', async () => {

    const res = await request(app).post('/wip?email=firsttest@test&zipcode=97216');
    expect(mockSES.sendEmail).toHaveBeenCalledTimes(1);
    expect(res.body).toEqual({ email: 'firsttest@test',
      id: expect.any(Number),
      park: expect.any(String),
      quote: expect.any(String),
      zipcode: expect.any(String) 
    });

  });

  //existing user - get should return the most recent user posted data
  it('updates a profile via POST if email already in db', async () => {
    await request(app).post('/wip?email=userexists@test&zipcode=97216');
    await request(app).post('/wip?email=userexists@test&zipcode=12345');
    const res = await request(app).get('/wip');

    expect(mockSES.sendEmail).toHaveBeenCalledTimes(2);
    expect(res.body).toEqual(expect.arrayContaining([{ email: 'userexists@test',
      id: expect.any(Number),
      park: expect.any(String),
      quote: expect.any(String),
      zipcode: '12345' }]));

  });

  //getAll + GET
  it('returns all user profiles via GET /wip/', async () => {
    await request(app).post('/wip?email=test@test&zipcode=97216');
    await request(app).post('/wip?email=test2@test&zipcode=97214');

    const profiles = [
      {
        email: 'test@test',
        id: expect.any(Number),
        park: expect.any(String),
        quote: expect.any(String),
        zipcode: expect.any(String)
      },
      {
        email: 'test2@test',
        id: expect.any(Number),
        park: expect.any(String),
        quote: expect.any(String),
        zipcode: expect.any(String)
      }
    ];

    expect(mockSES.sendEmail).toHaveBeenCalledTimes(2);
    const res = await request(app).get('/wip');
    expect(res.body).toEqual(expect.arrayContaining(profiles));

  });

});
