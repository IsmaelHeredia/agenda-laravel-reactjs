module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1',
        '^@store/(.*)$': '<rootDir>/src/store/$1',
        '^@layouts/(.*)$': '<rootDir>/src/layouts/$1',
        '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy',
    },
    transformIgnorePatterns: [
        'node_modules/(?!react-toastify/)',
    ],
};
