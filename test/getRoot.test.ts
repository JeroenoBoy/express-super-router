import { join } from "path";
import { getRoot } from "../src";


describe('Tests getRoot()', () => {

	const mainPath = process.cwd();

	it('Should use relative path', () => {
		const path = 'src/routes';

		const parsed = getRoot(path);		
		expect(parsed).toBe(join(mainPath, path));
	})

	it('Should use tests full path', () => {
		const parsed = getRoot(join(__dirname, 'routes'));
		expect(parsed).toBe(join(mainPath, 'test/routes'));
	})

})