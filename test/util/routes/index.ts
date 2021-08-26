import { Router } from 'express';
const route = Router();

route.get('/', (_req,res) => {
	res.send({
		'test': 'hello!'
	});
})

export default route;