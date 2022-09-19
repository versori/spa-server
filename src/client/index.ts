import { RuntimeConfig } from './core';

declare global {
    interface Window {
        __RUNTIME_CONFIG__: RuntimeConfig;
    }
}

export * from './config';
export * from './core';
export * from './load-config';
