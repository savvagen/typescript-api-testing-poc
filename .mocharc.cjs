module.exports = {
    require: [
        'ts-node/register'
    ],
    spec: ['test/**/*.test.ts'],
    ignore: ['test/pet.test.ts'],
    timeout: 60000,
    color: true,
    parallel: false,
    recursive: false,
    reporter: 'mocha-multi-reporters',
    'reporter-option': ['configFile=reporterConfig.json'],
}