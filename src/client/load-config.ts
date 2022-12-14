import debug from 'debug';
import { merge } from 'lodash';
import { setConfig } from './config';
import { RuntimeConfig, ValidateFn } from './core';

const log = debug('@versori:spa-server:loadConfig');

export async function loadConfig(defaultConfig?: RuntimeConfig, validate?: ValidateFn): Promise<RuntimeConfig> {
    const injected = window.__RUNTIME_CONFIG__;
    const config = merge(defaultConfig, injected);

    if (validate) {
        await validate(config);
    }

    setConfig(config);
    log('config loaded:', config);

    return config;
}
