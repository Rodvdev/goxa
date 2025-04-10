import { ApolloServer } from '@apollo/server';
import { startServerAndCreateNextHandler } from '@as-integrations/next';
import { typeDefs } from './typeDefs';
import { resolvers } from './resolvers';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async () => {
    const session = await getServerSession(authOptions);
    return { session };
  },
});

export const GET = handler;
export const POST = handler;

export default handler; 