import React from 'react';

import { Context } from './FetchProvider';
import stripRequest from './util/stripRequest';

export interface Response {
  loading: boolean;
  error: boolean;
  data: any;
}

export type SharedProps = RequestInit & {
  path?: string;
  context: Context;
  update?: (
    cache: Context['cache'],
    { data }: { data: any },
    updateRequest?: Context['updateRequest']
  ) => void;
};

export type MethodProps = SharedProps & {
  children: (
    handler: (init?: RequestInit & { path?: string }) => void,
    access: Response
  ) => React.ReactNode;
};

export default class Method extends React.Component<MethodProps> {
  state = {
    loading: false,
    error: false,
    data: false,
  };

  constructor(props: MethodProps) {
    super(props);

    this.handler = this.handler.bind(this);
  }

  handler<T>(init?: RequestInit & { path?: string }) {
    this.setState({ loading: true });

    const path = this.props.path || init.path;

    fetch(
      `${this.props.context.baseUrl}${path}`,
      stripRequest({
        ...this.props.context.request,
        ...this.props,
        ...init,
      })
    )
      .then(response => {
        if (!response.ok) {
          this.setState({
            loading: false,
            error: true,
          });

          throw Error(response.statusText);
        }
      })
      .then(data => {
        this.setState({
          loading: false,
          data,
        });

        if (this.props.update) {
          this.props.update(
            this.props.context.cache,
            { data },
            this.props.context.updateRequest
          );
        }
      });
  }

  render() {
    return this.props.children(this.handler, {
      loading: this.state.loading,
      error: this.state.error,
      data: this.state.data,
    });
  }
}
