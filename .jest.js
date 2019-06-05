module.exports = {
    collectCoverageFrom: [
        "components/**/*.{js,jsx,ts,tsx}",
        "!components/**/*.d.ts",
        "!.storybook/**/*",
        "!public/**/*"
    ],
    coverageThreshold: {
        global: {
            branches: 90,
            functions: 90,
            lines: 90,
            statements: 90
        }
    },
    coverageReporters: ["text"],
    snapshotSerializers: ["enzyme-to-json/serializer"],
    setupFiles: ["react-app-polyfill/jsdom"],
    setupFilesAfterEnv: ["<rootDir>/scripts/rc-tools/config/jest/setup.js"],
    testMatch: ["<rootDir>/components/**/story/**/*.test.{js,jsx,ts,tsx}"],
    testEnvironment: "jest-environment-jsdom-fourteen",
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest",
        "^.+\\.(css|less)$":
            "<rootDir>/scripts/rc-tools/config/jest/cssTransform.js",
        "^(?!.*\\.(js|jsx|ts|tsx|css|json)$)":
            "<rootDir>/scripts/rc-tools/config/jest/fileTransform.js"
    },
    transformIgnorePatterns: [
        "[/\\\\]node_modules[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "^.+\\.module\\.(css|sass|scss)$",
        "[/\\\\]scripts[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "[/\\\\]lib[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "[/\\\\]dist[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "[/\\\\].storybook[/\\\\].+\\.(js|jsx|ts|tsx)$",
        "[/\\\\]public[/\\\\].+\\.(js|jsx|ts|tsx)$"
    ],
    modulePaths: [],
    moduleNameMapper: {
        "^react-native$": "react-native-web",
        "^.+\\.module\\.(css|sass|scss)$": "identity-obj-proxy"
    },
    moduleFileExtensions: [
        "web.js",
        "js",
        "web.ts",
        "ts",
        "web.tsx",
        "tsx",
        "json",
        "web.jsx",
        "jsx",
        "node"
    ],
    watchPlugins: [
        "jest-watch-typeahead/filename",
        "jest-watch-typeahead/testname"
    ]
};
