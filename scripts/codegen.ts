import { generateSchema } from '@pothos/plugin-prisma/generator'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

generateSchema(prisma, {
  outputFile: './src/graphql/generated/prisma-types.ts',
}) 