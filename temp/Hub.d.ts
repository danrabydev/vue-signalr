/// <reference types="node" />
import { EventEmitter } from 'events';
import Vue from 'vue';
import { HubConnection } from '@microsoft/signalr';
import Log from './Log';
export interface HubConfig<V extends Vue> {
    autoReconnect?: boolean;
    requiresAuthentication?: boolean;
    listeners: Record<string, {
        (...args: any[]): any;
    }>;
}
export declare const defaultHubConfig: HubConfig<Vue>;
export default class Hub<V extends Vue> extends EventEmitter {
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
