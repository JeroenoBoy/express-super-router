import supertest from "supertest";
import app from "../../examples/basic-route";

describe('Basic example testing', () => {


	const agent = supertest(app);
	
	it('tests basic routing', () => {
		agent.get('/')
			.expect(200)
			.expect('Content-Type', 'application/json')
			.expect({ 'test': 'Hello World!' })
	})


	it('checks if /index returns 404', () => {
		agent.get('/index')
			.expect(404)
	})
});