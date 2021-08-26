import { Router } from 'express';
import { users } from '.';
const route = Router();

route.get('/', (req,res) => {
	const id = parseInt((req.params as { id: string }).id); 

	const user = users[id];
	if(!user) return res.send({
		code: 404,
		message: 'User not found'
	})
	
	res.send({id, ...user});
})

export default route;