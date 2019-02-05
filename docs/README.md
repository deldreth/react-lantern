# react-lantern

Illuminate data management through delcarative react components. It doesn't include any fancy http clients or switching methods and instead relies soley on fetch (for now).

## Installation

```
yarn add react-lantern
```

```
npm install --save react-lantern
```

## Fetch polyfill and furture signal support

Depending on your use case you may need to [polyfill fetch](https://github.com/github/fetch).

There is also a good chance that future releases of this library will rely on [AbortController](https://developer.mozilla.org/en-US/docs/Web/API/AbortController) which has somewhat [limited](https://caniuse.com/#feat=abortcontroller) support. `whatwg-fetch` does _not_ polyfill for AbortController so another [polyfill will be needed](https://github.com/mo/abortcontroller-polyfill).

## Usage

```javascript
import React from 'react';

import { FetchProvider, Get } from 'react-lantern';

const FetchingAllDay = () => (
  <FetchProvider baseUrl="https://jsonplaceholder.typicode.com">
    <Get path="/posts">
      {({ loading, error, data }) => {
        if (loading) {
          return <div>Loading...</div>;
        }

        if (error) {
          return <div>Error...</div>;
        }

        return data.map((post: any) => <div key={post.id}>{post.title}</div>);
      }}
    </Get>
  </FetchProvider>
);
```
