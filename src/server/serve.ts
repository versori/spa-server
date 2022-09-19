/* eslint-disable no-console */
import fastifyStatic, { FastifyStaticOptions } from '@fastify/static';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { readFileSync } from 'fs';
import * as path from 'path';
import { RuntimeConfig } from '../client';
import { injectConfig } from './inject-config';

const DEFAULT_PORT = 3000;
const DEFAULT_ADDRESS = '0.0.0.0';

type Opts = {
    port?: number;
    address?: string;
    static?: Omit<FastifyStaticOptions, 'root'>;
};

// eslint-disable-next-line default-param-last
export function serve(assetDir: string, config: RuntimeConfig = {}, opts?: Opts) {
    const indexHtml = readFileSync(path.resolve(assetDir, 'index.html'), {
        encoding: 'utf8',
        flag: 'r',
    });

    const injectedHtml = injectConfig(indexHtml, config);

    function serveIndex(req: FastifyRequest, reply: FastifyReply) {
        reply.type('text/html');
        reply.send(injectedHtml);
    }

    const app = Fastify({
        logger: true,
    });

    app.setNotFoundHandler((request, reply) => {
        if (request.url === '/favicon.ico') {
            reply.status(404);
            reply.send();
            return;
        }

        serveIndex(request, reply);
    });

    app.get('/', serveIndex);
    app.get('/index.html', serveIndex);
    app.register(fastifyStatic, {
        ...(opts?.static ?? {}),
        root: assetDir,
    });

    app.listen(opts?.port ?? DEFAULT_PORT, opts?.address ?? DEFAULT_ADDRESS, (err) => {
        // eslint-disable-next-line no-console
        if (err) {
            console.error('failed to start server: ', err);
            process.exit(1);
        }
    });
}
