import { Router } from 'express';
const route = Router();

route.get('/', (_req,res) => {
	res.send({
		'test': 'Hello World!'
	});
})

export default route;