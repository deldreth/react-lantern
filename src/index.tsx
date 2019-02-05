import React from 'react';

import FetchProvider, { FetchContext } from './FetchProvider';
import GetMethod, { GetProps } from './Get';
import Method, { MethodProps } from './Methods';

export { FetchProvider };

export const Get = (
  props: Pick<GetProps, Exclude<keyof GetProps, 'context'>>
) => (
  <FetchContext.Consumer>
    {context => <GetMethod {...props} method="GET" context={context} />}
  </FetchContext.Consumer>
);

type Props = Pick<MethodProps, Exclude<keyof MethodProps, 'context'>>;

export const Post = (props: Props) => (
  <FetchContext.Consumer>
    {context => <Method {...props} method="POST" context={context} />}
  </FetchContext.Consumer>
);

export const Put = (props: Props) => (
  <FetchContext.Consumer>
    {context => <Method {...props} method="PUT" context={context} />}
  </FetchContext.Consumer>
);

export const Patch = (props: Props) => (
  <FetchContext.Consumer>
    {context => <Method {...props} method="Patch" context={context} />}
  </FetchContext.Consumer>
);

export const Delete = (props: Props) => (
  <FetchContext.Consumer>
    {context => <Method {...props} method="Delete" context={context} />}
  </FetchContext.Consumer>
);
