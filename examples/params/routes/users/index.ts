import { Router } from 'express';
const route = Router();

export const users = [
	{
		name: 'Raphtalia',
		from: 'The Rising of the Shield Hero',
		tags: [ 'Best Girl 💖' ]
	},
	{
		name: 'Naofumi Iwatani',
		from: 'The Rising of the shield hero',
		tags: [ 'Shield guy with cheats' ]
	},
	{
		name: 'Jibril',
		from: 'No Game, No Life',
		tags: [ 'Coolest Flugel' ]
	},
	{
		name: 'Sora',
		from: 'No Game, No Life',
		tags: [ 'Omega brains' ]
	},
	{
		name: 'Rimuru Tempest',
		from: 'That time I Got Reincarnated as a Slime',
		tags: [ 'Slime guy with cheats' ]
	}
]

route.get('/', (_,res) => {
	res.send(users.map(({name}, id) => ({ id, name })));
})

export default route;