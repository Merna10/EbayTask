import {test} from "@playwright/test";


export function step(stepName:string) {
    return function decorator(target: Function, context: ClassMethodDecoratorContext) {
        return function replacementMethod(this: any, ...args: any[]) {
            const formattedStepName = stepName.replace(/\{(\d+)\}/g, (match, index) => {
                return args[index];
            });
            return test.step(formattedStepName, async () => {
                  return await target.call(this, ...args);
            });
        };
    }
    
}