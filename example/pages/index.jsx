import React from 'react';
import Link from 'next/link';

export default () => (
  <React.Fragment>
    <div>
      <Link href="/component">
        <a>With Component</a>
      </Link>
    </div>
    <div>
      <Link href="/hook">
        <a>With Custom Hook</a>
      </Link>
    </div>
  </React.Fragment>
);
