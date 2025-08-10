// This file sets up the Prisma Client for use in your project
import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as typeof globalThis & { prisma?: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
