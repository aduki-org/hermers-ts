import { Client, FeedService } from '../src/index.js';

async function testFeed() {
  const client = new Client({ key: 'hm_live_test' });
  const service = new FeedService(client);

  if (typeof service.create !== 'function') throw new Error('create missing');
  if (typeof service.list !== 'function') throw new Error('list missing');
  if (typeof service.sync !== 'function') throw new Error('sync missing');

  console.log('gRPC FeedService tests passed!');
}

testFeed().catch((err) => {
  console.error(err);
  process.exit(1);
});
