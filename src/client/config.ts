import { RuntimeConfig } from './core';

let config: RuntimeConfig = {};

export function getConfig(): RuntimeConfig {
    return config;
}

export function setConfig(runtimeConfig: RuntimeConfig) {
    config = runtimeConfig;
}
