import {Context, Suite, Test} from "mocha";
import {CONFIG} from "../../config/npmConfig";

export const mochaHooks = () => {
    if (CONFIG.getEnv("MOCHA_HOOKS_ENABLED", "false") == "true"){
        // root hooks object
        return {
            beforeEach: [
                function () {
                    console.log(`==== Started Test: ${this.currentTest.title} =====`)
                    // skip all tests for localhost
                    if (CONFIG.getEnv("BASE_URL").includes("localhost")) {
                        return this.skip();
                    }
                },
                function () {
                    if (this.currentTest.title === "should create user"){
                        // this.skip(); // skip the test
                        console.log("FOUND!!!!!!!!!!!!!!!!!!!!!!!!!!!")
                    }
                }
            ],
            afterEach(){
                let test: Test = this.currentTest
                let suite: Suite | undefined = test.parent
                //console.log(Object.getOwnPropertyNames(this.currentTest))
                console.log(`==== Finished Test: ${this.currentTest.title} =====`)
                console.log(test.title)
                console.log(test.body)
                console.log(`==== Finished Test Suite: ${suite.title} =====`)
            }
        }
    }
    return {
        beforeEach() {
            // regular beforeEach
        }
    }
}