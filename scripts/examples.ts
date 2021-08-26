import chalk from "chalk";
import { Command } from "commander";
import { lstatSync, readdirSync } from "fs";
import { join } from "path";
import { exitLog, info } from "./utils";
const { Select } = require('enquirer');

const DEFAULT_PORT = '8080';
const EXAMPLES_PATH = join(__dirname, '../examples');

(async () => {


	const version: string = require('../package.json').version;
	const program = new Command()
		.version(version)
		.name('yarn examples')
		.usage('[example] [options]')
		.option('-p --port [port]', 'Target port', DEFAULT_PORT)
		.parse()
	
	program.parse(process.argv);
	const options = program.opts();
	
	if(options.help) {
		program.help();
		process.exit();
	}
	
	const port = parseInt( options.port ?? DEFAULT_PORT );
	if(isNaN(port)) exitLog('port must be a number');

	//	Getting examples

	const examples = getAllExamples()

	//	Reading examples

	const asked = program.args[0] ?? await promptExample(examples);
	if(!asked) exitLog('No example found');
	
	const example = examples.find(filter(asked))
	if(!example) exitLog('This example does not exist!');

	//	Starting example
	
	info(`Starting example ${chalk.yellow(example!.name)}...`)

	process.env.RUN_EXAMPLE = 'true'

	const path = join(EXAMPLES_PATH, example!.path, '/index.ts');
	const app = require(path).default ?? require(path);
	app.listen(port, () => info(`Listening on port ${chalk.yellow(port)}`))

})();



function filter(query: string) {
	query = query.toLowerCase();
	return ({path,name}: IExample) => {
		name=name.toLowerCase();
		path=path.toLowerCase();
		return name==query||path==query;
	}
}

//	Example helper functions

interface IExample { path: string, name: string }

function promptExample(examples: IExample[]): Promise<string> {
	const prompt = new Select({
		name: 'example',
		message: 'Which example would you like to test?',
		choices: examples.map(({name})=>name)
	})

	return prompt.run();
}

function getAllExamples(): IExample[] {
	return readdirSync(EXAMPLES_PATH)
		.filter((file) => lstatSync(join(EXAMPLES_PATH, file)).isDirectory())
		.map((file) => ({ path: file, name: parseName(file) }))
}

function parseName(file: string) {
	const splitted = file.replace(/\-/g, ' ').split('');
	splitted[0] = splitted[0].toUpperCase();
	return splitted.join('');
}

