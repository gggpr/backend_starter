import Server from './server';
import {databaseMiddleware} from './middleware/database.middleware';
import {apolloMiddleware} from './middleware/apollo.middleware';

try {
  new Server(4000, [databaseMiddleware, apolloMiddleware]).run();
} catch (err) {
  console.log(err);
}
