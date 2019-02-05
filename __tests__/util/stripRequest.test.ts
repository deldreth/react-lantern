import stripRequest from '../../src/util/stripRequest';

test('Returns expected properties', () => {
  const testable = {
    body: 'body',
    cache: 'cache',
    credentials: 'credentials',
    headers: 'headers',
    integrity: 'integrity',
    keepalive: 'keepalive',
    method: 'method',
    mode: 'mode',
    redirect: 'redirect',
    referrer: 'referrer',
    referrerPolicy: 'referrerPolicy',
    signal: 'signal',
    window: 'window',
  };

  expect(stripRequest(testable)).toEqual(testable);
});

test('Removes extra properties', () => {
  const testable = {
    body: 'body',
    stuff: 'stuff',
  };

  const expected = {
    body: 'body',
  };

  expect(stripRequest(testable)).toEqual(expected);
});
