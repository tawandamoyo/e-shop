
const request = require('supertest');
const knex = require('../pgconfig');
const app = require('../server');

test('userPostRouteRequest', (resolve) => {

  let testData = {
    email: 'j@gmail.com', 
    role: 'buyer', 
    username: 'jon'
  }
    request(app)
        .post('/user')
        .send(testData)
        .expect(200)
        .then( async (res) => {
            console.log('running tests');

            const data = await knex('users')
                          .select('username', 'email', 'role')
                          .where('id', res.body.id)
            let selectedRow = data[0];
            console.log(selectedRow);
            expect(selectedRow).toStrictEqual(testData);
        
           resolve();
    });
} );

test('userGetRouteRequest', (resolve) => {

  let testData = {
    id: 1000001,
    email: 'admin@eshop.com', 
    role: 'seller', 
    username: 'admin'
  }
    request(app)
        .get('/user/1000001')
        .send()
        .expect(200)
        .then( async (res) => {
            console.log(res.body);
            expect(testData).toStrictEqual(res.body);        
           resolve();
    });
} );


