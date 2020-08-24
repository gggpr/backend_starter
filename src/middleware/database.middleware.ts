import {createConnection} from 'typeorm';
export const databaseMiddleware = async () => {
  await createConnection();
};
