import { DefaultMethods } from 'vue/types/options';

export interface HubConfig<V extends Vue> {
  autoReconnect?: boolean;
  requiresAuthentication?: boolean;
  listeners: Record<string, { (...args: any[]): any }>;
}
