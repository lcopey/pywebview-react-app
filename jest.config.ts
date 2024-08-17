// import { pathsToModuleNameMapper } from 'ts-jest';
// import { compilerOptions } from './tsconfig.app.json';

const jestConfig = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    moduleNameMapper: {
        '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/test/__ mocks __/fileMock.js',
        // ...pathsToModuleNameMapper(compilerOptions.paths),
        '^@app/(.*)$': '<rootDir>/src/$1',
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
};

export default jestConfig;
