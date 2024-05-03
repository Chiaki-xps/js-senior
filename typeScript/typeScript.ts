type MyeReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
