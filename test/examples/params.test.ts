import supertest from "supertest"
import app from "../../examples/params"
import { users } from "../../examples/params/routes/users";

describe('Routing params', () => {

	it.each([
		[0, false],
		[1, false],
		[2, false],
		[3, false],
		[4, false],
		[100, true]
	])('Checks if user %n exists', async (index, error) => {
		await supertest(app).get('/users/'+index)
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(error ? { code: 404, message: 'User not found' } : {id: index, ...users[index]})
			.then()
	})


	it('Lists every user', (done) => {
		supertest(app).get('/users')
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(({body}) => {
				expect(body).toBeInstanceOf(Array);
			})
			.end(done)
	});


	// function cbHandler(...callbacks: ((next: () => void) => any)[]) {
	// 	let i = 0;
	// 	const next = () => callbacks.length == i ?? callbacks[i++](next);
	// 	next();
	// }


	it('Checks if Raphtalia is best girl', async () => {
		let id = -1;

		await supertest(app)
			.get('/users')
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect(({body}) => {
				id = body.find((d: any)=>d.name=='Raphtalia')!.id as number
			})
			.then()

		await supertest(app)
			.get(`/users/${id}`)
			.expect(200)
			.expect('Content-Type', 'application/json; charset=utf-8')
			.expect((res) => {
				expect(res.body.tags).toContain('Best Girl 💖');
			})
			.then()
	})
})