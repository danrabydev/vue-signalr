/// <reference path="./Index.d.ts" />
import Vue from 'vue'; // <-- notice the changed import
import { EventEmitter } from 'events';
import * as SignalR from '@microsoft/signalr';
import { HubConnection } from '@microsoft/signalr';
import { InspectOptions } from 'util';

export class Log {
  enabled: boolean;
  constructor(enabled: boolean) {
    this.enabled = enabled;
    if (!enabled) {
      this.log = () => {};
      this.dir = () => {};
      this.table = () => {};
    }
  }

  log(...args: any[]) {
    this.enabled && console.log(...args);
  }

  dir(obj: any, options?: InspectOptions | undefined) {
    this.enabled && console.dir(obj, options);
  }

  table(obj: any) {
    this.enabled && console.table(obj);
  }
}

export const HUB_STARTED = 'HUB_STARTED';
export const HUB_STOPPED = 'HUB_STOPPED';

export interface HubConfig<V extends Vue> {
  autoReconnect?: boolean;
  requiresAuthentication?: boolean;
  listeners: Record<string, { (...args: any[]): any }>;
}

export const defaultHubConfig: HubConfig<Vue> = {
  autoReconnect: true,
  requiresAuthentication: false,
  listeners: {},
};

export class Hub<V extends Vue> extends EventEmitter {
  options: HubConfig<V>;

  socket: HubConnection | null = null;

  private listening: string[] = [];

  private initialized: boolean = false;
  private paused: boolean = false;
  private connected: boolean = false;
  private name: string;
  private log: Log;
  private urlBase: string;
  private vue: Vue;

  constructor(
    vue: Vue,
    urlBase: string,
    name: string,
    options: HubConfig<V> = defaultHubConfig,
    log: Log
  ) {
    super();

    this.vue = vue;
    this.log = log;
    this.name = name;
    this.urlBase = urlBase;
    this.options = Object.assign({}, defaultHubConfig, options);
    if (!this.options.requiresAuthentication) this.init();

    this.on(HUB_STARTED, () => {
      log.log(`Event: ${HUB_STARTED}`);
      this.connected = true;
    });
    this.on(HUB_STOPPED, () => {
      log.log(`Event: ${HUB_STOPPED}`);
      this.connected = false;
    });
  }

  async init() {
    if (!this.options.listeners) return;

    if (this.socket) {
      await this.stop();
    }

    this.socket = this.buildSocket();

    this.initialized = true;
  }
00330-80818-81510-AA205
  buildSocket(): HubConnection {
    const builder = new SignalR.HubConnectionBuilder().withUrl(
      `${this.urlBase}/${this.name}`
    );

    this.options.autoReconnect && builder.withAutomaticReconnect();

    const connection = builder.build();

    const methods = Object.keys(this.options.listeners);

    methods.forEach((listener) => {
      this.once(HUB_STARTED, () => {
        if (this.listening.includes(listener)) return;
        this.listening.push(listener);
        this.socket?.on(listener, (...data: any[]) => {
          this.options.listeners[listener].call(this.vue, ...data);
        });
      });
    });

    connection.onclose(() => {
      this.listening = [];
    });

    return connection;
  }

  async start() {
    await this.init();
    await this.socket?.start();
    this.emit(HUB_STARTED);
  }

  send(methodName: string, ...args: any[]) {
    this.log.log({ type: 'send', methodName, args });

    if (this.socket) {
      this.socket.send(methodName, ...args);
      return;
    }

    this.once(HUB_STARTED, () => this.socket?.send(methodName, ...args));
  }

  invoke(methodName: string, ...args: any[]) {
    this.log.log({ type: 'invoke', methodName, args });

    if (this.socket) {
      return this.socket.invoke(methodName, ...args);
    }

    return new Promise(async (resolve) =>
      this.once(HUB_STARTED, () =>
        resolve(this.socket?.invoke(methodName, ...args))
      )
    );
  }

  async stop() {
    await this.socket?.stop();
    this.socket = null;
    this.listening = [];
    this.emit(HUB_STOPPED);
  }

  authenticate() {}
}

export function mapHubs(hubNames: string[]): Record<string, { (): Hub<Vue> }> {
  const computedList: Record<string, { (): Hub<Vue> }> = {};

  hubNames.forEach((hubName) => {
    computedList[hubName] = function (this: Vue) {
      return this.$signalr.hubs[hubName];
    };
  });

  return computedList;
}

export class VueSignalR extends EventEmitter {
  public hubs: Record<string, Hub<Vue>> = {};
  log: Log;
  baseUrl: string;

  constructor(baseUrl: string, log: Log, options?: any) {
    super();
    this.log = log;
    this.baseUrl = baseUrl;
  }

  async registerHub(vue: Vue, name: string, options: HubConfig<Vue>) {
    if (this.hubs[name]) {
      this.hubs[name].stop();
      delete this.hubs[name];
    }
    this.hubs[name] = new Hub(vue, this.baseUrl, name, options, this.log);
  }
}

function SignalRPlugin(
  vue: typeof Vue,
  options: { baseUrl: string; log?: boolean }
): void {
  const log = new Log(options?.log ?? false);
  const signalr = new VueSignalR(options.baseUrl, log);
  console.log('Created VueSignalR');

  Object.defineProperties(vue.prototype, {
    $signalr: {
      get() {
        return signalr;
      },
    },
  });

  vue.mixin({
    async created(this: Vue) {
      const hubs = this.$options.hubs;
      const signalr = this.$signalr;

      if (!hubs) return;

      const hubNames = Object.keys(hubs);

      if (!hubNames.length) return;

      log.log('VueSignalR:Created:' + this.$options.name);

      hubNames.forEach(async (hubName) => {
        const hubConfig = hubs[hubName];
        if (!hubConfig) return;
        await signalr.registerHub(this, hubName, hubConfig);
      });
      log.dir(signalr);
    },
    // destroyed() {
    //   log.log('VueSignalR:Destroyed');
    // },
  });
}

export default SignalRPlugin;
