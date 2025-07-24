import 'dotenv/config';
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import cookie from '@fastify/cookie';
import jwt from '@fastify/jwt';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';

import indexRoute from './routes/indexRoute';
import errorHandler from './helpers/errorHandler';

const {
  BACKEND_PORT,
  FRONTEND_URL,
  COOKIE_SECRET,
  JWT_SECRET,
} = process.env;

const app = Fastify();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);
app.setErrorHandler(errorHandler);

app.register(fastifyCors, {
  origin: [FRONTEND_URL!],
  credentials: true,
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Cookie',
    'Access-Control-Allow-Origin',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
});

app.register(cookie, {
  secret: COOKIE_SECRET!,
  hook: 'onRequest',
  parseOptions: {
    secure: false,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  },
});

app.register(jwt, {
  secret: JWT_SECRET!,
  cookie: {
    cookieName: 'token',
    signed: false,
  }
});

const startServer = async () => {
  await indexRoute(app);

  await app.listen({
    port: Number(BACKEND_PORT) || 3000,
    host: '0.0.0.0',
  });
};

try {
  startServer();

  console.log(`Backend online em http://localhost:${BACKEND_PORT}`);
} catch (error) {
  console.error(error);
}

const listeners = ['SIGINT', 'SIGTERM'];

listeners.forEach(signal => {
  process.on(signal, async () => {
    await app.close();

    process.exit(0);
  });
});
