import { JSDOM } from 'jsdom';
import { RuntimeConfig } from '../client';

/**
 * Takes an HTML string and a config object and injects the object into the
 * global `window.__RUNTIME_CONFIG__`.
 * @param html
 * @param config
 */
export function injectConfig(html: string, config: RuntimeConfig): string {
    const dom = new JSDOM(html);
    const {
        window: { document },
    } = dom;
    const { body } = document;

    const scriptTag = document.createElement('script');
    scriptTag.type = 'text/javascript';
    scriptTag.appendChild(document.createTextNode(`window.__RUNTIME_CONFIG__=${JSON.stringify(config)};`));

    body.insertBefore(scriptTag, body.childNodes[0]);
    return dom.serialize();
}
