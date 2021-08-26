import chalk from 'chalk';


export function info(...str: any[]) {
	console.log(chalk.green('⇒ '), ...str)
}

export function infoText(...str: any[]) {
	return [chalk.green('⇒ '), ...str].join(' ')
}



export function exitLog(...str: any[]) {
	console.log(chalk.red('⇒ '), ...str)
	process.exit(1);
}
