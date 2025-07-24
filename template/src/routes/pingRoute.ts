import { FastifyInstance } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

import { pingController } from '../controllers/pingController';

const pingRoute = async (fastify: FastifyInstance) => {
  const routeOptions = fastify.withTypeProvider<ZodTypeProvider>();

  routeOptions.get('/ping',
    { schema: { hide: true } },
    pingController
  );
};

export default pingRoute;
