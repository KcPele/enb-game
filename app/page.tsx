'use client';

import dynamic from 'next/dynamic';
import type { JSX } from 'react';

const Frame = dynamic(() => import('./components/Frame'), {
  ssr: false,
});

const Home = (): JSX.Element => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <Frame />
    </main>
  );
};

export default Home;
