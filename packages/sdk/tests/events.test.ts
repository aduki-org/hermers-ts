import { Client, Events } from '../src/index.js';

async function testEvents() {
  const client = new Client({ key: 'hm_live_test' });
  const events = new Events(client);

  if (typeof events.list !== 'function') throw new Error('list missing');
  if (typeof events.range !== 'function') throw new Error('range missing');
  if (typeof events.create !== 'function') throw new Error('create missing');

  console.log('SDK Events tests passed!');
}

testEvents().catch((err) => {
  console.error(err);
  process.exit(1);
});
