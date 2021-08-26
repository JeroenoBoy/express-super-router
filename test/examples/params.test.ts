import supertest from "supertest"
import app from "../../examples/params"
import { users } from "../../examples/params/routes/users";

describe('Routing params', () => {

	const agent = supertest(app);

	it.each([
		[0, false],
		[1, false],
		[2, false],
		[3, false],
		[4, false],
		[100, true]
	])('Checks if user %n exists', (index, error) => {
		agent.get('/users/'+index)
			.expect(200)
			.expect('Content-Type', 'application/json')
			.expect(error ? { code: 404, message: 'User not found' } : users[index])
	})


	it('Lists every user', () => {
		agent.get('/users')
			.expect(200)
			.expect('Content-Type', 'application/json')
			.expect(({body}) => {
				expect(body).toBeInstanceOf(Array);
			})
	});


	it('Checks if Raphtalia is best girl', () => {
		let id = -1;
		agent.get('/users')
			.expect(200)
			.expect('Content-Type', 'application/json')
			.expect(({body}) => {
				id = body.find((d: any)=>d.name=='Raphtalia')!.id as number
			})
		agent.get(`/users/${id}`)
			.expect(200)
			.expect('Content-Type', 'application/json')
			.expect((res) => {
				expect(res.body.tags).toContain('Best Girl 💖');
				console.log('Raphtalia best girl 💖')
			})
	})
})