import { beforeEach, describe, expect, it } from '@jest/globals';
import { getConfig } from '../config';
import { loadConfig } from '../load-config';

describe('load-config', () => {
    describe('configuration merging', () => {
        beforeEach(() => {
            window.__RUNTIME_CONFIG__ = {};
        });

        it('handles undefined', async () => {
            window.__RUNTIME_CONFIG__ = { foo: 'bar' };
            await loadConfig({ foo: undefined, baz: 'cat' });

            expect(getConfig()).toEqual({
                foo: 'bar',
                baz: 'cat',
            });
        });

        it('handles nested config', async () => {
            window.__RUNTIME_CONFIG__ = { foo: { bar: 'baz' } };
            await loadConfig({ foo: { cat: true, bar: undefined } });

            expect(getConfig()).toEqual({
                foo: {
                    bar: 'baz',
                    cat: true,
                },
            });
        });
    });
});
