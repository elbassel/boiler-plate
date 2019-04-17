const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

const config = require('../config');
const server = require('../index');

chai.use(chaiHttp);

before(async() => {
    console.log('Starting server');
    await server.start();
});

after(async () => {
    await server.stop();
});

describe('Rest API health check is working fine', () => {
    it('Should return http status 200', async () => {
        return chai.request(`${config.api.host}:${config.api.port}`)
            .get('/health')
            .then((res) => {
                expect(res).to.have.status(200);
            })
            .catch((err) => {
                throw err;
            });
    });
});
