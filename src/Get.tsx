import React from 'react';

import { Response, SharedProps } from './Methods';
import stripRequest from './util/stripRequest';

export type GetProps = SharedProps & {
  children: (access: Response) => React.ReactNode;
  name?: string;
};

export default class Method extends React.Component<GetProps> {
  state = {
    loading: true,
    error: false,
    data: false,
  };

  async componentDidMount(init?: RequestInit) {
    this.props.context.operations.set(this.props.name || this.props.path, {});

    this.setState({ loading: true });

    try {
      const response = await fetch(
        `${this.props.context.baseUrl}${this.props.path}`,
        {
          ...stripRequest(this.props),
          ...this.props.context.request,
          ...init,
        }
      );

      const data = await response.json();

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
    } catch (err) {
      this.setState({
        loading: false,
        error: true,
      });
    }
  }

  render() {
    return this.props.children({
      loading: this.state.loading,
      error: this.state.error,
      data: this.state.data,
    });
  }
}
