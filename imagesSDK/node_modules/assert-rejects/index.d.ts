declare function assertRejects(promise: Promise<any>, message?: string | Error): Promise<void>;
declare function assertRejects(promise: Promise<any>, error: RegExp | Function | Object | Error, message?: string | Error): Promise<void>;

export = assertRejects
