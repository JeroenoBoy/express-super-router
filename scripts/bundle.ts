// Requires node 16.7.0+ to run

import fs from 'fs';
import { exec } from 'child_process';

const bundleDir = '.bundle';

(async () => {
	
	//	Replacing directory
	
	if(fs.existsSync(bundleDir)) {
		console.log('Clearing bundle dir');
		fs.rmSync(bundleDir, { recursive: true, force: true});
	}
	else {
		console.log('Creating bundle dir');
		fs.mkdirSync(bundleDir);
	}
	
	//	Building source
	
	console.log('Building source');
	await build();
	console.log('Source builded');

	//	Copying files

	console.log('Copying files')

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
		exec('yarn build', (err, b, e2) => {
			if(err) throw err;
			console.log(b);
			console.log(e2);
			res();
		});
	})
}