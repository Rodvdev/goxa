declare module '@prisma/client' {
  import { PrismaClient as BasePrismaClient, Prisma as BasePrisma } from '.prisma/client';
  
  export type PrismaClient = BasePrismaClient;
  export type Prisma = BasePrisma;
  export const PrismaClient: new () => PrismaClient;
} 