import { Global, Module } from '@nestjs/common';
import { PrismaService } from 'src/prisma2/prisma.service';
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService],
})
export class Prisma2Module {}
