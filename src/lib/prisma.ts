import { PrismaClient } from '@prisma/client';

// PrismaClient es adjuntado al objeto global en entornos de desarrollo para evitar
// múltiples instancias de Prisma Client en desarrollo de hot-reloading
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = 
  global.prisma || 
  new PrismaClient();

// En desarrollo, adjuntamos a global, en producción no es necesario
if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
} 