// Requires node 16.7.0+ to run

import fs from 'fs';
import { exec } from 'child_process';
import { info } from './utils';

const bundleDir = '.bundle';

(async () => {
	
	//	Replacing directory
	
	if(fs.existsSync(bundleDir)) {
		info('Clearing bundle dir');
		fs.rmSync(bundleDir, { recursive: true, force: true});
	}
	else {
		info('Creating bundle dir');
		fs.mkdirSync(bundleDir);
	}
	
	//	Building source
	
	info('Building source');
	await build();
	info('Source builded');

	//	Copying files

	info('Copying files')

	await copyFolder('src');
	copyFile('package.json');
	copyFile('README.md');
	copyFile('tsconfig.json');
	copyFile('yarn.lock');

})();


function copyFile(src: string) {
	fs.copyFileSync(src, bundleDir + '/' + src)
}

function copyFolder(src: string) {
	return new Promise<void>((res) => {
		exec(`cp -r ${src} ${bundleDir}/${src}`, () => {
			res();
		});
		// p.on('exit', () => res());
	})
}


function build() {
	return new Promise<void>((res) => {
		exec('yarn build', (err, b) => {
			if(err) throw err;
			info(b)
			res();
		});
	})
}