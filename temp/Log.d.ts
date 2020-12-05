/// <reference types="node" />
import { InspectOptions } from 'util';
export default class Log {
    enabled: boolean;
    constructor(enabled: boolean);
    log(...args: any[]): void;
    dir(obj: any, options?: InspectOptions | undefined): void;
    table(obj: any): void;
}
