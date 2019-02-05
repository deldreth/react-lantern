import React from 'react';

import { shallow } from 'enzyme';

import FetchProvider from '../src/FetchProvider';

test('FetchProvider baseUrl', () => {
  const Provider = shallow(
    <FetchProvider baseUrl="http://www.fireflyxd.com">
      <div>Test</div>
    </FetchProvider>
  );

  expect(Provider.props().value.baseUrl).toBe('http://www.fireflyxd.com');
  expect(Provider).toMatchSnapshot();
});
