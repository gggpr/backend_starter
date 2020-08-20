import Server from './library/server/server';
try {
  new Server().run();
} catch (err) {
  console.log(err);
}
