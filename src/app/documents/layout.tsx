import LiveBlockProvider from '@/components/context/LiveBlockProvider';
import React from 'react'

function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LiveBlockProvider>{children}</LiveBlockProvider>;
}

export default layout
