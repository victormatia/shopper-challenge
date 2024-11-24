import chai, { expect } from 'chai';
import App from '../../App';
import chaiHttp from 'chai-http';

describe('App test cases', () => {

  chai.use(chaiHttp);

  it('Should return the awaited result when the test route is called', async () => {

    const app = new App();

    app.init('8000');

    const request = await chai.request('http://localhost:8000').get('/test');

    const testRouteMock = { status: 'OK' };

    expect(request.status).to.be.equal(200);
    expect(request.body).to.be.deep.equals(testRouteMock);
  });
});