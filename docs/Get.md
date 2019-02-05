# Get consumer component

## Details

Uses an http GET. The Get component is unique among the components in that it relies on an observable manager to handle refetching within the context tree.

Much like the other consumers the child of Get is a function as a component that provides `loading`, `error`, `data`.

## Simple example

```javascript
import React from 'react';

import { Get } from 'react-lantern';

export default class AwesomeComponent extends React.Component {
  render() {
    return (
      <div>
        <h1>My posts</h1>

        <Get path="/posts">
          {({ loading, error, data }) => {
            if (loading) {
              return <div>Loading state</div>;
            }

            if (error) {
              return <div>Error state</div>;
            }

            return data.map((post: any) => (
              <div key={post.id}>{post.title}</div>
            ));
          }}
        </Get>
      </div>
    );
  }
}
```
