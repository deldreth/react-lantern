import React from 'react';

export interface Context {
  cache: Map<string, any>;
  baseUrl: string;
  operations: Map<string, any>;
  request: RequestInit;
  readonly updateRequest: (request: RequestInit) => void;
}

export const FetchContext = React.createContext<Context | null>(null);

export interface FetchProviderProps {
  baseUrl: string;
  children: React.ReactNode;
  defaultRequest?: RequestInit;
}

export default class FetchProvider extends React.Component<FetchProviderProps> {
  store: Context = {
    cache: new Map(),
    baseUrl: null,
    operations: new Map(),
    request: {},
    updateRequest: this.updateRequest.bind(this),
  };

  constructor(props: FetchProviderProps) {
    super(props);

    this.store.baseUrl = props.baseUrl;
    this.store.request = props.defaultRequest;
  }

  render() {
    return (
      <FetchContext.Provider value={this.store}>
        {this.props.children}
      </FetchContext.Provider>
    );
  }

  private updateRequest(request: RequestInit) {
    this.store.request = {
      ...this.store.request,
      ...request,
    };
  }
}
