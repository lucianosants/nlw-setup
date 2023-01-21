import Fastify from 'fastify';
import cors from '@fastify/cors';
import { appRoutes } from './routes';

const app = Fastify();

app.register(cors);
app.register(appRoutes);

app.listen({
	port: 3333,
	host: '0.0.0.0', // change to you IP. example: 123.456.7.891
}).then(() => {
	console.log('HTTP Server running in 3333');
});
