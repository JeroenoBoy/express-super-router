import { Router } from 'express';
const route = Router();

route.get('/', (_req,res) => {
	res.send({
		message: '👋'
	});
})

export default route;