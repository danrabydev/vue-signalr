import Vue from 'vue';
import { VueSignalR, HubConfig } from './Index';

declare module 'vue/types/vue' {
  // Global properties can be declared
  // on the `VueConstructor` interface
  interface VueConstructor {
    $signalr: VueSignalR;
  }
  interface Vue {
    $signalr: VueSignalR;
  }
}

// ComponentOptions is declared in types/options.d.ts
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    hubs?: Record<string, HubConfig<V>>;
  }
}
