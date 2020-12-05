/// <reference types="node" />
import { EventEmitter } from 'events';
import Vue from 'vue';
import { HubConfig } from './Hub';
import Log from './Log';
import Hub from './Hub';
export default class VueSignalR extends EventEmitter {
    hubs: Record<string, Hub<Vue>>;
    log: Log;
    baseUrl: string;
    constructor(baseUrl: string, log: Log, options?: any);
    registerHub(vue: Vue, name: string, options: HubConfig<Vue>): Promise<void>;
}
