import {allure} from "allure-mocha/runtime";


export function Step(name?: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (...args: any[]) {
            if (allure != undefined){
                let stepParams = ()=> {
                    const arg = args instanceof Object ? JSON.stringify(args) : args
                    if (arg.length > 250) return arg.substring(1, 250) + " ..."
                    else return arg
                }
                let stepName = name ? name : `Method ${propertyKey} with parameters: ${stepParams()}`
                const step = allure.createStep(stepName, () => {
                    return originalMethod.apply(this, args);
                })
                return step();
            } else return originalMethod.apply(this, args)
        }
    }
}

export function Feature(name: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (...args: any[]) {
            if (allure != undefined) allure.feature(name)
            return originalMethod.apply(this, args);
        }
    }
}

export function Story(text: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (...args: any[]) {
            if (allure != undefined) allure.story(text)
            return originalMethod.apply(this, args);
        }
    }
}

export function Description(html: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (...args: any[]) {
            if (allure != undefined) allure.descriptionHtml(html)
            return originalMethod.apply(this, args);
        }
    }
}

export function Issue(name: string, issueLink: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (...args: any[]) {
            if (allure != undefined) allure.issue(name, issueLink)
            return originalMethod.apply(this, args);
        }
    }
}

export function Tms(name: string, tmsLink: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (...args: any[]) {
            if (allure != undefined) allure.tms(name, tmsLink)
            return originalMethod.apply(this, args);
        }
    }
}