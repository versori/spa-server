import helmet, { FastifyHelmetOptions } from '@fastify/helmet';
import fastifyStatic, { FastifyStaticOptions } from '@fastify/static';
import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import type { RouteShorthandOptions } from 'fastify/types/route';
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
    helmet?: FastifyHelmetOptions;
    perRouteOptions?: Record<string, RouteShorthandOptions & { helmet?: FastifyHelmetOptions }>;
};

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

    app.register(helmet, {
        global: true,
        ...(opts?.helmet ?? {}),
    });
    app.register(fastifyStatic, {
        ...(opts?.static ?? {}),
        root: assetDir,
        preCompressed: true,
    });

    const { perRouteOptions = {} } = opts ?? {};
    const routes = Object.keys(perRouteOptions);

    if (!routes.includes('/')) {
        app.get('/', serveIndex);
    }

    if (!routes.includes('/index.html')) {
        app.get('/index.html', serveIndex);
    }

    routes.forEach((route) => {
        app.get(route, { config: perRouteOptions[route] }, serveIndex);
    });

    app.listen(
        {
            port: opts?.port ?? DEFAULT_PORT,
            host: opts?.address ?? DEFAULT_ADDRESS,
        },
        (err) => {
            if (err) {
                console.error('failed to start server: ', err);
                process.exit(1);
            }
        }
    );
}
