import { date, email, hex, pagination } from '../src/data/index.js';

function assert(cond: boolean, msg: string) {
  if (!cond) throw new Error(`Assertion failed: ${msg}`);
}

async function testData() {
  // Date validation
  const validIso = date('2026-04-28T14:00:00Z', 'start');
  assert(validIso === '2026-04-28T14:00:00.000Z', 'date ISO parsing');

  try {
    date('invalid-date', 'start');
    assert(false, 'should fail invalid date');
  } catch (e: unknown) {
    assert((e as Error).message.includes('Invalid UTC ISO-8601 date'), 'catch invalid date');
  }

  // Hex validation
  const validHex = hex('U0X123456789', 'user', 'U0X');
  assert(validHex === 'U0X123456789', 'hex prefix match');

  try {
    hex('T0X123', 'user', 'U0X');
    assert(false, 'should fail prefix mismatch');
  } catch (e: unknown) {
    assert((e as Error).message.includes('must start with prefix'), 'catch prefix mismatch');
  }

  // Email validation
  const validEmail = email('USER@DOMAIN.COM', 'email');
  assert(validEmail === 'user@domain.com', 'email normalization');

  // Pagination validation
  const pag = pagination({ limit: 50, page: 2 });
  assert(pag.limit === 50 && pag.page === 2, 'pagination parsing');

  console.log('SDK data validation tests passed!');
}

testData().catch((err) => {
  console.error(err);
  process.exit(1);
});
