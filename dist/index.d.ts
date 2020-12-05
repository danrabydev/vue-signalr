/// <reference path="../src/Index.d.ts" />
/// <reference types="node" />
import Vue from 'vue';
import { EventEmitter } from 'events';
import { HubConnection } from '@microsoft/signalr';
import { InspectOptions } from 'util';
export declare class Log {
    enabled: boolean;
    constructor(enabled: boolean);
    log(...args: any[]): void;
    dir(obj: any, options?: InspectOptions | undefined): void;
    table(obj: any): void;
}
export declare const HUB_STARTED = "HUB_STARTED";
export declare const HUB_STOPPED = "HUB_STOPPED";
export interface HubConfig<V extends Vue> {
    autoReconnect?: boolean;
    requiresAuthentication?: boolean;
    listeners: Record<string, {
        (...args: any[]): any;
    }>;
}
export declare const defaultHubConfig: HubConfig<Vue>;
export declare class Hub<V extends Vue> extends EventEmitter {
    options: HubConfig<V>;
    socket: HubConnection | null;
    private listening;
    private initialized;
    private paused;
    private connected;
    private name;
    private log;
    private urlBase;
    private vue;
    constructor(vue: Vue, urlBase: string, name: string, options: HubConfig<V> | undefined, log: Log);
    init(): Promise<void>;
    buildSocket(): HubConnection;
    start(): Promise<void>;
    send(methodName: string, ...args: any[]): void;
    invoke(methodName: string, ...args: any[]): Promise<any>;
    stop(): Promise<void>;
    authenticate(): void;
}
export declare function mapHubs(hubNames: string[]): Record<string, {
    (): Hub<Vue>;
}>;
export declare class VueSignalR extends EventEmitter {
    hubs: Record<string, Hub<Vue>>;
    log: Log;
    baseUrl: string;
    constructor(baseUrl: string, log: Log, options?: any);
    registerHub(vue: Vue, name: string, options: HubConfig<Vue>): Promise<void>;
}
declare function SignalRPlugin(vue: typeof Vue, options: {
    baseUrl: string;
    log?: boolean;
}): void;
export default SignalRPlugin;
