module.exports = {
    require: [
        'ts-node/register',
        "src/hooks/mocha.ts",
        "mochawesome/register"
    ],
    spec: ['src/test/**/*.test.ts'],
    ignore: ['src/test/pet.test.ts'],
    timeout: 60000,
    color: true,
    parallel: false,
    recursive: false,
    reporter: 'mocha-multi-reporters',
    'reporter-option': ['configFile=reporterConfig.json'],
}