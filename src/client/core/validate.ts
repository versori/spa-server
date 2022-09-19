import { RuntimeConfig } from './runtime-config';

export class ValidateError {
    public readonly messages: string[];

    constructor(messages: string[]) {
        this.messages = messages;
    }
}

export type ValidateFn = (config: RuntimeConfig) => Promise<void>;
