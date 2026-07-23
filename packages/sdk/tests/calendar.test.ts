import { Calendar, Client } from '../src/index.js';

async function testCalendar() {
  const client = new Client({ key: 'hm_live_test' });
  const calendar = new Calendar(client);

  if (typeof calendar.list !== 'function') throw new Error('list missing');
  if (typeof calendar.create !== 'function') throw new Error('create missing');

  console.log('SDK Calendar tests passed!');
}

testCalendar().catch((err) => {
  console.error(err);
  process.exit(1);
});
