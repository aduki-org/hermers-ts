import { Client, Scheduling } from '../src/index.js';

async function testScheduling() {
  const client = new Client({ key: 'hm_live_test' });
  const scheduling = new Scheduling(client);

  if (typeof scheduling.book !== 'function') throw new Error('book missing');
  if (typeof scheduling.services !== 'function') throw new Error('services missing');
  if (typeof scheduling.availability !== 'function') throw new Error('availability missing');

  console.log('SDK Scheduling tests passed!');
}

testScheduling().catch((err) => {
  console.error(err);
  process.exit(1);
});
