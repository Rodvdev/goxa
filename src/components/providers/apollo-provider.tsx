'use client';

import { ApolloProvider } from '@apollo/client';
import { client } from '@/app/api/graphql/client';

export function ApolloWrapper({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
} 