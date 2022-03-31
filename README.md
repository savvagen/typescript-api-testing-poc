

## Running Tests
`npm test & npm run allure-report`

Run tests with mocha root hooks plugin:
```
MOCHA_HOOKS_ENABLED=true npm test & npm run allure-report
```

## Migrating mocha to ES Modules support and new `got` version

``` 
https://stackoverflow.com/questions/64261239/mocha-tests-with-esm-support-for-native-es6-modules
```

### 1. `package.json`:
``` 
{
    "type": "module"
    "dependencies": {
        "got": "^12.0.2" // or later
    }
} 
```
### 2. `tsconfig.json`:
``` 
{
    "compilerOptions": {
        "module": "esnext",
        "moduleResolution": "node",
    }
}
```
### 3. `.mocharc.json`:
``` 
"node-option": [
    "experimental-specifier-resolution=node",
    "loader=ts-node/esm"
],
"require": [
    "ts-node/register"
],
```