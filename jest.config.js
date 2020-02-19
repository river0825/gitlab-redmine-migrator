module.exports = {
    "roots": [
        "<rootDir>/src"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "testMatch": [
        "**/**/*.test.ts",
    ],
    "collectCoverageFrom": [
        "**/*.{ts,tsx}",
        "!**/node_modules/**",
        "!**/vendor/**"
    ]
};