import {allure} from "allure-mocha/runtime";


export function Listener(listener: MethodListener<any>) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        let originalMethod = descriptor.value;
        //wrapping the original method
        descriptor.value = function (...args: any[]) {
            //--------
            // Step will be created in the end if @Listener will be called first
            //--------
            /*
            console.log("wrapped function: before invoking " + propertyKey);
            let result = originalMethod.apply(this, args);
            const step = allure.createStep("wrapped function: after invoking " + propertyKey, ()=>{
                return result
            })
            listener.onMethodInvoked(result);
            console.log("wrapped function: after invoking " + propertyKey);
            return step()
            */

            //--------
            // Step will be created first if @Listener will be called first
            //--------
            const step = allure.createStep("wrapped function: after invoking " + propertyKey, ()=>{
                console.log("wrapped function: before invoking " + propertyKey);
                const result = originalMethod.apply(this, args);
                listener.onMethodInvoked(result)
                console.log("wrapped function: after invoking " + propertyKey)
                return result
            })
            return step()
        }
    }
}

export interface MethodListener<T> {
    onMethodInvoked(result: T): void;
}

export class MyListener implements MethodListener<any> {
    onMethodInvoked(result: any): void {
        console.log("MyListener#onMethodInvoked: " + result);
    }
}