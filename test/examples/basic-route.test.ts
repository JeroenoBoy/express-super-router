import supertest from "supertest";
import app from "../../examples/basic-route";

describe('Basic example testing', () => {
	
	it('tests basic routing', (done) => {
		supertest(app).get('/')
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect({ 'test': 'Hello World!' })
			.end(done)
	})


	it('checks if /index returns 404', (done) => {
		supertest(app).get('/index')
			.expect(404)
			.end(done)
	})
});