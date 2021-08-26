import { Router } from 'express';
import SysPath from 'path';
import FS from 'fs';


const ROOT_PATH = process.cwd();


export interface SuperRouterOptions {
	/**
	 * Should Express Super Router recursively check the file paths?
	 * @default true
	 */
	recursive?: boolean,

	/**
	 * The prefix used to ignore
	 * @default #
	 */
	ignorePrefix?: string
}

export default function superrouter(dir: string, options: SuperRouterOptions = {}) {
	const ROUTER = Router({ mergeParams: true });

	const opts = Object.assign(options, {
		ignoorePrefix: '#',
		recursive: true
	})
	
	//	Reading through the routes
	
	function readFolders(root: string, route: string) {
		FS.readdirSync(root).forEach((file) => {
			if(file.startsWith(opts.ignorePrefix!)) return;

			const path = SysPath.join(root, file);

			
			if(opts.recursive! && FS.lstatSync(path).isDirectory())
				return readFolders(path, route+'/'+file);

			if(/\.[tj]s$/.test(file) && file.length > 3)
				return readFile(path, route+'/'+file);
		})
	}

	//	Loading the folder & checking 

	function readFile(root: string, route: string) {
		let exports: any = require(root); exports = exports.default ?? exports;
		route = parseRoute(route);

		if(Object.getPrototypeOf(exports) != Router) return;
		ROUTER.use(route, exports);

		//	@ts-ignore
		if(!exports.mergeParams) exports.mergeParams = true;
	}

	readFolders(getRoot(dir), '');

	return ROUTER;
}


export function getRoot(dir: string) {
	if(SysPath.isAbsolute(dir)) return dir;
	return SysPath.join(ROOT_PATH, dir);
}


export function parseRoute(route: string) {
	return route.match(/^(.*)\.[tj]s$/)![1]		//	Removes file extension, also removes index if requires
		.replace(/\/index$/, '/')				//	Removes index file name
		.replace(/\[(\w+)\]/g, '/:$1/')			//	Parses Params
		.replace(/\/{2,}/g, '/')				//	Removes '/{2,}' and turns into '/'
		.replace(/^(.+)\/$/, '$1');				//	Remove trailing /'s
}