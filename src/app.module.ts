import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { Prisma2Module } from './prisma2/prisma2.module';
import { PrismaService } from './prisma2/prisma.service';

@Module({
  imports: [Prisma2Module, BookModule, Prisma2Module],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
