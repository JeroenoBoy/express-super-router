import { parseRoute } from "../src";
import chalk from 'chalk';

describe('Tests parseRoute()', () => {

	//	General function

	const testToBe = (route: string, result: string) => expect(parseRoute(route)).toBe(result);
	const result = chalk.cyan('[ %s => %s ]')

	//	Tests

	it.each([
		['/file.ts', '/file'],
		['/file.js', '/file'],
	])('should remove the file expression propperly '+result, testToBe)


	it.each([
		['/index.ts', '/'],
		['/index232.ts', '/index232'],
		['/abcindex.ts', '/abcindex'],
		['/index/abc.ts', '/index/abc'],
	])('should remove index propperly '+result, testToBe)


	it('should remove all double slashes', () => testToBe('////////////////////////////test.ts', '/test'))
	it('should have no trailing slashes', () => testToBe('/test/.ts', '/test'))


	it.each([
		['/[id].ts', '/:id'],
		['/blogs[id].ts', '/blogs/:id'],
		['/blogs[id]/index.ts', '/blogs/:id'],
	])('should parse params propperly '+result, testToBe)

})