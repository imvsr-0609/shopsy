// module.exports = {
// 	setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
// 	testPathIgnorePatterns: ['<rootDir>/.next/', '<rootDir>/node_modules/'],
// };

module.exports = {
	roots: ['<rootDir>'],
	modulePathIgnorePatterns: ['/cypress/'],
	coveragePathIgnorePatterns: ['/cypress/'],
	moduleFileExtensions: ['ts', 'tsx', 'js'],
	testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules|.next)[/\\\\]'],
	transformIgnorePatterns: ['[/\\\\]node_modules[/\\\\].+\\.(ts|tsx)$'],
	transform: {
		'^.+\\.(ts|tsx)$': 'babel-jest',
	},
	moduleNameMapper: {
		'\\.(css|less|sass|scss)$': 'identity-obj-proxy',
		'\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__mocks__/fileMock.js',
	},
	collectCoverageFrom: [
		'**/*.ts',
		'**/*.tsx',
		'!pages/**',
		'!.next/**',
		'!jest.config.js',
		'!next-env.d.ts',
		'!coverage/**',
		'!test/**',
		'!types/**',
	],
	coverageThreshold: {
		global: {
			lines: process.env.TEST_COVERAGE,
		},
	},
	coverageReporters: ['text-summary', 'lcov', 'cobertura'],
	testEnvironment: 'jest-environment-jsdom',
};
